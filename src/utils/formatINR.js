export default function formatINR(val, isRent = false) {
  if (val == null || isNaN(val)) return '';
  if (isRent) return `₹${val.toLocaleString('en-IN')}/mo`;
  
  if (val >= 10000000) {
    const str = (val / 10000000).toFixed(2);
    return `₹${str.replace(/\.00$/, '').replace(/(\.\d)0$/, '$1')} Cr`;
  }
  if (val >= 100000) {
    const str = (val / 100000).toFixed(2);
    return `₹${str.replace(/\.00$/, '').replace(/(\.\d)0$/, '$1')} L`;
  }
  return `₹${val.toLocaleString('en-IN')}`;
}
