import path from "path";
import fs from "fs/promises";
const buildTree = async (currentDir, currentTree) => {
    const files = await fs.readdir(currentDir);
    for (const file of files) {
        if (file === "node_modules")
            continue;
        if (file === 'dist')
            continue;
        const filePath = path.join(currentDir, file);
        const stats = await fs.stat(filePath);
        const node = {
            name: file,
            path: filePath,
            isDir: stats.isDirectory(),
            content: "",
            children: stats.isDirectory() ? [] : undefined,
        };
        currentTree.children.push(node);
        if (stats.isDirectory()) {
            await buildTree(filePath, node);
        }
        else {
            node.content = await fs.readFile(filePath, "utf-8");
        }
    }
};
const generateFileTree = async (dir) => {
    const root = {
        name: path.basename(dir),
        isDir: true,
        content: "",
        children: [],
    };
    await buildTree(dir, root);
    return root;
};
export default generateFileTree;
//# sourceMappingURL=treeGenerator.js.map