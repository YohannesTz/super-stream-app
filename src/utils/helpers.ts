import { faker } from "@faker-js/faker";
import { MessageModel } from "./models";

export function generateRandomMessage(): MessageModel {
  return {
    id: faker.number.int(),
    content: {
      chatId: faker.number.int(),
      type: faker.lorem.word(),
      date: faker.number.int(),
      text: faker.lorem.sentence(),
    },
    author: {
      id: faker.number.int(),
      firstName: faker.person.firstName(),
      username: faker.internet.userName(),
      isBot: faker.datatype.boolean(),
      currentBadge: faker.helpers.arrayElement([
        "mod",
        "host",
        "sub",
        "normal",
      ]),
      color: faker.internet.color(),
    },
  };
}

export function generateRandomMessages(numMessages: number): MessageModel[] {
  const messages: MessageModel[] = [];

  for (let i = 0; i < numMessages; i++) {
    const message: MessageModel = {
      id: faker.number.int(),
      content: {
        chatId: faker.number.int(),
        type: faker.lorem.word(),
        date: faker.number.int(),
        text: faker.lorem.sentence(),
      },
      author: {
        id: faker.number.int(),
        firstName: faker.person.firstName(),
        username: faker.internet.userName(),
        isBot: faker.datatype.boolean(),
        currentBadge: faker.helpers.arrayElement([
          "mod",
          "host",
          "sub",
          "normal",
        ]),
        color: faker.internet.color(),
      },
    };

    messages.push(message);
  }

  return messages;
}

export function checkMediaTypeByUrl(url: string): string {
  const videoExtensions = [
    ".mp4",
    ".avi",
    ".mov",
    ".mkv",
    ".flv",
    ".wmv",
    ".webm",
  ];
  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".svg",
    ".webp",
  ];
  const extension = url.substring(url.lastIndexOf(".")).toLowerCase();

  if (videoExtensions.includes(extension)) {
    return "video";
  } else if (imageExtensions.includes(extension)) {
    return "img";
  } else {
    return "unknown";
  }
}
