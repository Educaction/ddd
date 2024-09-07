import { Error } from "sequelize";

export type NotificationError = {
  message: string;
  context: string;
}

export default class Notificaiton {
  private errors: NotificationError[] = [];

  addError(error: NotificationError) {
    this.errors.push(error)
  }

  messages(context?: string): string {
    let message = "";

    this.errors.forEach(error => {
      if (context === undefined || error.context === context) {
        message += `${error.context}: ${error.message},`;
      }
    });
    return message;
  }
}