interface MajorCredits {
    credits: number;
    brand: "MajorCredits";
}

interface MinorCredits {
    credits: number;
    brand: "MinorCredits";
}

function sumMajorCredits(subject1: MajorCredits, subject2: MajorCredits): MajorCredits{
    return {
        credits: subject1.credits + subject2.credits,
        brand: "MajorCredits"
    }
}

function sumMinorCredits(subject1: MinorCredits, subject2: MinorCredits): MinorCredits{
    return {
        credits: subject1.credits + subject2.credits,
        brand: "MinorCredits"
    }
}

const M1: MajorCredits = {credits: 3, brand: 'MajorCredits'};
const M2: MajorCredits = {credits: 3, brand: 'MajorCredits'};
const m1: MinorCredits = {credits: 0, brand: 'MinorCredits'};
const m2: MinorCredits = {credits: 8, brand: 'MinorCredits'};

const ResultMajorCredits = sumMajorCredits(M1, M2);
const ResultMinorCredits = sumMinorCredits(m1, m2);

console.log(`Result of the sum major credits : ${ResultMajorCredits.credits}`);
console.log(`Result of the sum minor credits : ${ResultMinorCredits.credits}`);