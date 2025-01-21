import { initialData } from "./seed";

async function main() {
  console.log(initialData);

  console.log("Seed ejecutado correctamente");
}

(() => {
  if (process.env.NODE_ENV === "production") {
    console.log("No se puede ejecutar el seed en producción");
    return;
  }

  main();
})();
