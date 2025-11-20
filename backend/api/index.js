export default function handler(req, res) {
    res.writeHead(302, { Location: 'https://stefanopaolonii.github.io/visitor-badge/' });
    res.end();
}