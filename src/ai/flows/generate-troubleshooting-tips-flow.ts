'use server';
/**
 * @fileOverview An AI assistant that provides troubleshooting tips based on application status.
 *
 * - generateTroubleshootingTips - A function that handles the generation of troubleshooting tips.
 * - GenerateTroubleshootingTipsInput - The input type for the generateTroubleshootingTips function.
 * - GenerateTroubleshootingTipsOutput - The return type for the generateTroubleshootingTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTroubleshootingTipsInputSchema = z.object({
  status: z
    .enum(['running', 'degraded', 'error'])
    .describe('The current health status of the application.'),
  version: z
    .string()
    .optional()
    .describe('The current version of the application.'),
  description: z
    .string()
    .optional()
    .describe('A more detailed description of the current status or observed issues.'),
});
export type GenerateTroubleshootingTipsInput = z.infer<
  typeof GenerateTroubleshootingTipsInputSchema
>;

const GenerateTroubleshootingTipsOutputSchema = z.object({
  tips: z
    .string()
    .describe('A markdown-formatted list of beginner-friendly troubleshooting tips.'),
});
export type GenerateTroubleshootingTipsOutput = z.infer<
  typeof GenerateTroubleshootingTipsOutputSchema
>;

export async function generateTroubleshootingTips(
  input: GenerateTroubleshootingTipsInput
): Promise<GenerateTroubleshootingTipsOutput> {
  return generateTroubleshootingTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTroubleshootingTipsPrompt',
  input: {schema: GenerateTroubleshootingTipsInputSchema},
  output: {schema: GenerateTroubleshootingTipsOutputSchema},
  prompt: `You are an AI-powered DevOps expert assistant for a CI/CD project. Your goal is to provide beginner-friendly, contextual troubleshooting tips based on the application's reported health status.

Current Application Status: {{{status}}}
{{#if version}}Application Version: {{{version}}}{{/if}}
{{#if description}}Observed Issues: {{{description}}}{{/if}}

Please provide simple, actionable troubleshooting tips or diagnostic prompts for this status. Format your response as a markdown list.`,
});

const generateTroubleshootingTipsFlow = ai.defineFlow(
  {
    name: 'generateTroubleshootingTipsFlow',
    inputSchema: GenerateTroubleshootingTipsInputSchema,
    outputSchema: GenerateTroubleshootingTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
