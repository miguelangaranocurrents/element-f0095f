/* DBG_TMP: temporary diagnostics, remove before merging. */

function describe(el: Element): string {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    const cls = typeof el.className === "string" ? el.className.split(" ").slice(0, 3).join(".") : "";
    return (
        `${el.tagName}.${cls} pos=${cs.position} z=${cs.zIndex} ov=${cs.overflowX}/${cs.overflowY} ` +
        `contain=${cs.contain} transform=${cs.transform} rect=[t${Math.round(r.top)} b${Math.round(r.bottom)} ` +
        `l${Math.round(r.left)} r${Math.round(r.right)}]`
    );
}

export function dbgTmpDump(label: string, getEl: () => Element | null | undefined): void {
    setTimeout(() => {
        const el = getEl();
        if (!el) {
            console.log("DBG_TMP", label, "no element");
            return;
        }
        const r = el.getBoundingClientRect();
        const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
        const chain: string[] = [];
        let n: Element | null = el;
        while (n && n !== document.documentElement) {
            chain.push(describe(n));
            n = n.parentElement;
        }
        const panel = document.querySelector(".mx_RoomView_messagePanel, .mx_ScrollPanel");
        const scroll = panel
            ? `panel top=${panel.scrollTop} h=${panel.scrollHeight} ch=${panel.clientHeight} left=${panel.scrollLeft} w=${panel.scrollWidth} cw=${panel.clientWidth}`
            : "no panel";
        const se = document.scrollingElement;
        console.log(
            "DBG_TMP",
            label,
            `viewport=${innerWidth}x${innerHeight} docScroll=${se?.scrollLeft},${se?.scrollTop} ${scroll}`,
            `hit=${hit ? describe(hit) : "null"}`,
            "\n" + chain.join("\n"),
        );
    }, 1500);
}
