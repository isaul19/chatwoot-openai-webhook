import { ChatwootRepository } from "../repository/chatwoot.repository";
import { OpenAiService } from "../services/openai.service";
import { Print } from "./print";
import { sleep } from "./sleep";

interface ProcessMessageParams {
  tokenOpenAI: string;
  threadId?: string | null;
  idAssistant: string;
  messages: string[];
  conversationId: number;
}

export const questionToOpenaiAssistant = async ({
  tokenOpenAI,
  threadId,
  idAssistant,
  messages,
  conversationId,
}: ProcessMessageParams) => {
  const chatwootRepository = new ChatwootRepository();
  const openAiService = new OpenAiService(tokenOpenAI);

  if (!threadId) {
    const newThread = await openAiService.createThread();
    threadId = newThread.id;

    await chatwootRepository.saveThread({
      idConversation: conversationId,
      idThread: threadId,
    });
  }

  await openAiService.addMessage(threadId, messages.join("\n"));

  console.log("Ejecutando OpenAI con threadId:", threadId);
  const runThread = await openAiService.runThread(threadId, idAssistant);

  let runRetrieve = await openAiService.runRetrieve(threadId, runThread);

  while (runRetrieve.status !== "completed") {
    await sleep(1);
    runRetrieve = await openAiService.runRetrieve(threadId, runThread);

    if (["failed", "cancelled", "expired"].includes(runRetrieve.status)) {
      console.error(`❌ ERROR: La ejecución falló con estado '${runRetrieve.status}'.`);
      console.error("Detalles de la respuesta de OpenAI:", JSON.stringify(runRetrieve, null, 2));
      return "error";
    }
  }

  const messagesResponse = await openAiService.getMessages(threadId);
  return messagesResponse.data[0].content[0].text.value;
};
