function levenshteinDistance(s, t) {
    if (s === t) {
        return 0;
    }
    if (s.length === 0) {
        return t.length;
    }
    if (t.length === 0) {
        return s.length;
    }

    const v0 = new Array(t.length + 1);
    const v1 = new Array(t.length + 1);

    for (let i = 0; i < v0.length; i++) {
        v0[i] = i;
    }

    for (let i = 0; i < s.length; i++) {
        v1[0] = i + 1;

        for (let j = 0; j < t.length; j++) {
            const cost = (s[i] === t[j]) ? 0 : 1;
            v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
        }

        for (let j = 0; j < v0.length; j++) {
            v0[j] = v1[j];
        }
    }

    return v1[t.length];
}
