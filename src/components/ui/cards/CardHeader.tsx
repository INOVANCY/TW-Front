interface TWCardHeaderPropos {
  text: string;
}

export default function TWCardHeader({ text }: TWCardHeaderPropos) {
  return <h1 className="text-xl text-slate-800">{text}</h1>;
}
