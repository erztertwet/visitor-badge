document.getElementById("generate").onclick = async () => {
  const res = await fetch("/api/new-key");
  const data = await res.json();

  const key = data.key;
  const base = window.location.origin;

  const badgeUrl = `https://img.shields.io/endpoint?url=${base}/api/view/${key}`;
  const markdown = `![Visits](${badgeUrl})`;

  document.getElementById("result").style.display = "block";
  document.getElementById("key").value = key;
  document.getElementById("badge").value = badgeUrl;
  document.getElementById("markdown").value = markdown;
};
