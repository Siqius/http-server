import { AppDataSource } from "./data-source";
import { Message } from "./entity/Message";

AppDataSource.initialize().catch((error) => console.log(error));

export function addMessage(author: string, message: string, imageURI: string) {
  const newMessage = new Message();

  newMessage.author = author;
  newMessage.message = message;
  newMessage.imageURI = imageURI;

  AppDataSource.manager.save(newMessage);
}

export function removeMessage(id: number) {
  AppDataSource.manager.delete(Message, id);
}

export function getMessages() {
  return AppDataSource.manager.find(Message);
}
