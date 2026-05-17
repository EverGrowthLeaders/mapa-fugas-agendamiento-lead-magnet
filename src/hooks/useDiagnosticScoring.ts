import { useMemo } from 'react';
import type {
  BucketKey,
  BucketResult,
  DiagnosticAnswers,
  DiagnosticResult,
  RiskLevel,
} from '../types/diagnostic';
import { bucketLabels } from '../data/results';

// Map A-E option values to score increments per question.
const Q2_SCORES: Record<string, number> = { A: 0, B: 1, C: 2, D: 3, E: 2 };
const Q3_SCORES: Record<string, number> = { A: 0, B: 2, C: 3, D: 3 };
const FOUR_LEVEL: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };

// Number of channels in Q4 contributes to "control" bucket.
function channelScore(channels: string[] | undefined): number {
  const count = channels?.length ?? 0;
  if (count >= 5) return 2;
  if (count >= 3) return 1;
  return 0;
}

// Q7 inverts: more criteria collected = lower risk.
function criteriaScore(items: string[] | undefined): number {
  if (!items || items.length === 0) return 3;
  if (items.includes('none')) return 3;
  const count = items.filter((v) => v !== 'none').length;
  if (count >= 6) return 0;
  if (count >= 3) return 1;
  if (count >= 1) return 2;
  return 3;
}

// Q9 slider 0-60% maps to no-show risk tiers.
function noShowSliderScore(pct: number | undefined): number {
  const value = pct ?? 0;
  if (value <= 10) return 0;
  if (value <= 20) return 1;
  if (value <= 35) return 2;
  return 3;
}

function levelFromPercentage(pct: number): RiskLevel {
  if (pct <= 30) return 'controlled';
  if (pct <= 60) return 'moderate';
  if (pct <= 80) return 'high';
  return 'critical';
}

// Max possible score per bucket (sum of question max contributions).
const BUCKET_MAX: Record<BucketKey, number> = {
  speedToLead: 6, // Q2 (3) + Q3 (3)
  qualification: 12, // Q5 + Q6 + Q7 + Q8
  noShow: 9, // Q9 + Q10 + Q11
  followUp: 3, // Q12
  briefing: 6, // Q13 + Q16
  crmControl: 6, // Q14 + Q15
  control: 2, // Q4 channel count
};

// Tie-break priority when several buckets share the top percentage.
const TIE_BREAK_ORDER: BucketKey[] = [
  'speedToLead',
  'qualification',
  'noShow',
  'briefing',
  'crmControl',
  'followUp',
  'control',
];

function buildBucketResult(
  key: BucketKey,
  score: number,
  max: number,
): BucketResult {
  const percentage = max === 0 ? 0 : Math.round((score / max) * 100);
  return {
    key,
    label: bucketLabels[key],
    score,
    max,
    percentage,
    level: levelFromPercentage(percentage),
  };
}

function tierFromShare(
  share: number,
): 'selective' | 'partial' | 'relevant' | 'broad' {
  if (share <= 20) return 'selective';
  if (share <= 50) return 'partial';
  if (share <= 80) return 'relevant';
  return 'broad';
}

export function computeDiagnostic(
  answers: DiagnosticAnswers,
): DiagnosticResult {
  // Bucket aggregation — each question contributes to a single bucket.
  const speedToLead =
    (answers.q2 ? Q2_SCORES[answers.q2] : 0) +
    (answers.q3 ? Q3_SCORES[answers.q3] : 0);

  const qualification =
    (answers.q5 ? FOUR_LEVEL[answers.q5] : 0) +
    (answers.q6 ? FOUR_LEVEL[answers.q6] : 0) +
    criteriaScore(answers.q7) +
    (answers.q8 ? FOUR_LEVEL[answers.q8] : 0);

  const noShow =
    noShowSliderScore(answers.q9) +
    (answers.q10 ? FOUR_LEVEL[answers.q10] : 0) +
    (answers.q11 ? FOUR_LEVEL[answers.q11] : 0);

  const followUp = answers.q12 ? FOUR_LEVEL[answers.q12] : 0;

  const briefing =
    (answers.q13 ? FOUR_LEVEL[answers.q13] : 0) +
    (answers.q16 ? FOUR_LEVEL[answers.q16] : 0);

  const crmControl =
    (answers.q14 ? FOUR_LEVEL[answers.q14] : 0) +
    (answers.q15 ? FOUR_LEVEL[answers.q15] : 0);

  const control = channelScore(answers.q4);

  const bucketScores: Record<BucketKey, BucketResult> = {
    speedToLead: buildBucketResult(
      'speedToLead',
      speedToLead,
      BUCKET_MAX.speedToLead,
    ),
    qualification: buildBucketResult(
      'qualification',
      qualification,
      BUCKET_MAX.qualification,
    ),
    noShow: buildBucketResult('noShow', noShow, BUCKET_MAX.noShow),
    followUp: buildBucketResult('followUp', followUp, BUCKET_MAX.followUp),
    briefing: buildBucketResult('briefing', briefing, BUCKET_MAX.briefing),
    crmControl: buildBucketResult(
      'crmControl',
      crmControl,
      BUCKET_MAX.crmControl,
    ),
    control: buildBucketResult('control', control, BUCKET_MAX.control),
  };

  const totalRisk =
    speedToLead +
    qualification +
    noShow +
    followUp +
    briefing +
    crmControl +
    control;

  const maxPossibleRisk = Object.values(BUCKET_MAX).reduce(
    (acc, v) => acc + v,
    0,
  );

  const riskPercentage = Math.round((totalRisk / maxPossibleRisk) * 100);

  // Primary leak = bucket with highest percentage; tie-breaks follow fixed order.
  const sortedKeys = (Object.keys(bucketScores) as BucketKey[])
    .slice()
    .sort((a, b) => {
      const diff = bucketScores[b].percentage - bucketScores[a].percentage;
      if (diff !== 0) return diff;
      return (
        TIE_BREAK_ORDER.indexOf(a) - TIE_BREAK_ORDER.indexOf(b)
      );
    });

  const primaryLeak: BucketKey = sortedKeys[0];

  const automationReadinessShare = answers.q18 ?? 50;
  const selectedAutomationAreas = (answers.q17 ?? []).filter(
    (v) => v !== 'none',
  );

  return {
    bucketScores,
    totalRisk,
    maxPossibleRisk,
    riskPercentage,
    overallScore: riskPercentage,
    primaryLeak,
    automationReadinessShare,
    selectedAutomationAreas,
    mainConcern: answers.q19,
    automationTier: tierFromShare(automationReadinessShare),
  };
}

export function useDiagnosticScoring(
  answers: DiagnosticAnswers,
): DiagnosticResult {
  return useMemo(() => computeDiagnostic(answers), [answers]);
}
