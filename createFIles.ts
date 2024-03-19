import { promises as fs } from "fs";
import * as path from "path";

async function createComponent(componentName: string) {
  const dirPath = path.join(__dirname, componentName);
  await fs.mkdir(dirPath);

  const tsxContent = `interface ${componentName}Props {}

const ${componentName}: React.FC<${componentName}Props> = ({  }) => {
  return (
    <div className=""></div>
  );
};

export default ${componentName};
`;

  const indexPath = `import ${componentName} from "./${componentName}";
export default ${componentName};
`;

  await fs.writeFile(path.join(dirPath, `${componentName}.tsx`), tsxContent);
  await fs.writeFile(path.join(dirPath, `${componentName}.css`), "");
  await fs.writeFile(path.join(dirPath, `index.tsx`), indexPath);
}

const components = [
  "Mercury",
  "Venus",
  "Earth",
  "Moon",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
];
components.forEach((component) => {
  createComponent(component).catch(console.error);
});
