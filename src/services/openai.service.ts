import OpenAI from "openai";
import { PagePromise } from "openai/core";

export class OpenAiService {
  private readonly openai: OpenAI;

  constructor(tokenOpenAI: string) {
    this.openai = new OpenAI({ apiKey: tokenOpenAI });
  }

  async addMessage(threadId: string, content: string): Promise<void> {
    await this.openai.beta.threads.messages.create(threadId, {
      role: "user",
      content,
    });
  }

  async createThread(): Promise<OpenAI.Beta.Threads.Thread> {
    return await this.openai.beta.threads.create();
  }

  async runThread(threadId: string, assistantId: string): Promise<OpenAI.Beta.Threads.Run> {
    return await this.openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
    });
  }

  async runRetrieve(
    threadId: string,
    runThread: OpenAI.Beta.Threads.Run
  ): Promise<OpenAI.Beta.Threads.Run> {
    return await this.openai.beta.threads.runs.retrieve(threadId, runThread.id);
  }

  async cancelRun(threadId: string, runId: string): Promise<void> {
    await this.openai.beta.threads.runs.cancel(threadId, runId);
  }

  async listRuns(
    threadId: string
  ): Promise<PagePromise<OpenAI.Beta.Threads.Runs.RunsPage, OpenAI.Beta.Threads.Runs.Run>> {
    return await this.openai.beta.threads.runs.list(threadId, { limit: 5 });
  }

  async runSubmitToolOutputs(
    threadId: string,
    runThread: OpenAI.Beta.Threads.Run,
    toolOutputs: { tool_call_id: string; output: any }[]
  ): Promise<void> {
    await this.openai.beta.threads.runs.submitToolOutputs(threadId, runThread.id, {
      tool_outputs: toolOutputs,
    });
  }

  async getMessages(threadId: string): Promise<any> {
    return await this.openai.beta.threads.messages.list(threadId);
  }
}
