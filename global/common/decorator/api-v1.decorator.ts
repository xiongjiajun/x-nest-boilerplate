import { Controller } from "./controller-register.decorator";

export const APIv1 = (name: string): ClassDecorator => {
    return Controller("api/v1/" + name);
}

