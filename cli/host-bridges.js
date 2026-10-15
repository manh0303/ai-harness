// Paths with the standard managed block; surrounding project text is never owned.
export const HOST_BRIDGES = {
  copilot: { path: '.github/copilot-instructions.md', body: 'Read the applicable AGENTS.md before working. Follow its Harness entry point and load relevant skills from .agents/skills. Report actual verification evidence.' },
  'gemini-cli': { path: 'GEMINI.md', body: '@./AGENTS.md' },
};
export const isHostBridge = name => Object.values(HOST_BRIDGES).some(bridge => bridge.path === name);
