import path from "path";

export function getViewPath (view) {
    return path.join(process.cwd(), `./dist/views/${view}.html`)
};