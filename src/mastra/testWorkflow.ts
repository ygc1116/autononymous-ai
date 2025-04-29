import { reactComponentWorkflow } from "./workflows";

async function test() {
  const result = await reactComponentWorkflow("A simple button", "MyButton.tsx");
  console.log(result);
}

test();