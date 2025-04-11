import { AppDataSource } from "./data-source";
import { Message } from "./entity/Message";

export async function addMessage(
  author: string,
  message: string,
  imageURI: string
) {
  const newMessage = new Message();
  newMessage.author = author;
  newMessage.message = message;
  newMessage.imageURI = imageURI;

  await AppDataSource.manager.save(newMessage);
}

export async function removeMessage(id: number) {
  await AppDataSource.manager.delete(Message, id);
}

export async function getMessages() {
  return await AppDataSource.manager.find(Message);
}
