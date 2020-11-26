export const dirname = (dn: string) => {
    return (target) => {
        Object.defineProperty(target.prototype, "__dirname__", {
            writable: false,
            value: dn,
        });
    }
}