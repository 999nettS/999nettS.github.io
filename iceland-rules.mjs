const RULES={
  2025:{
    jurisdiction:'Iceland',effectiveFrom:'2025-01-01',effectiveTo:'2025-12-31',reviewed:'2026-09-27',
    tax:{brackets:[{upTo:472005,rate:.3149},{upTo:1325127,rate:.3799},{upTo:null,rate:.4629}],monthlyCredit:68691,source:'https://www.skatturinn.is/english/individuals/key-rates-and-amounts'},
    pension:{employeeRate:.04,employerRate:.115,source:'https://www.lifeyrismal.is/en/qa/payments-into-a-pension-fund'},
    unions:{vr:{rate:.007,source:'https://www.vr.is/en/about-vr/membership-fee-and-membership/'}}
  },
  2026:{
    jurisdiction:'Iceland',effectiveFrom:'2026-01-01',effectiveTo:'2026-12-31',reviewed:'2026-09-27',
    tax:{brackets:[{upTo:498122,rate:.3149},{upTo:1398450,rate:.3799},{upTo:null,rate:.4629}],monthlyCredit:72492,source:'https://www.skatturinn.is/english/individuals/tax-brackets/2026'},
    pension:{employeeRate:.04,employerRate:.115,source:'https://www.lifeyrismal.is/en/qa/payments-into-a-pension-fund'},
    unions:{vr:{rate:.007,source:'https://www.vr.is/media/rvoloaou/vr-agm-2026-vefur.pdf'}}
  }
};
export function yearFromPeriod(value){const match=String(value||'').match(/\b(20\d{2})\b/);return match?Number(match[1]):null}
export function getIcelandRules(period){const year=yearFromPeriod(period);return year?RULES[year]||null:null}
export function calculateTax(taxableIncome,tax){let remaining=Math.max(0,Number(taxableIncome)||0),previous=0,total=0;const tiers=[];for(const bracket of tax.brackets){const capacity=bracket.upTo==null?remaining:Math.max(0,bracket.upTo-previous),amount=Math.min(remaining,capacity),withheld=Math.round(amount*bracket.rate);tiers.push({amount,rate:bracket.rate,withheld});total+=withheld;remaining-=amount;if(bracket.upTo!=null)previous=bracket.upTo;if(remaining<=0)break}return{tiers,total}}
export const supportedYears=Object.freeze(Object.keys(RULES).map(Number));
