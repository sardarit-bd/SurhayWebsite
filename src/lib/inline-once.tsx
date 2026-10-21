import { inlineScripts, type InlineScriptName } from '../inline/generated';

export function InlineScript({ name }: { name: InlineScriptName }) {
  return <script type="module" dangerouslySetInnerHTML={{ __html: inlineScripts[name] }} />;
}
