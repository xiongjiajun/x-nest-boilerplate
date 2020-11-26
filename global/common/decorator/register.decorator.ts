import { registeredWorks } from "app/registry";
import { BaseWork } from "base/base.work"

export const Register = () => {

    return (target: unknown) => {
        if(target instanceof BaseWork) {
            registeredWorks.push(target);
        }
    }

}