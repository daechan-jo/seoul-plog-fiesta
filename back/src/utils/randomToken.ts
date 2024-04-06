export function createRandomToken() {
  const variable =
    '0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z'.split(
      ',',
    );
  const passwordLength = 8;

  let randomString = '';
  for (let j = 0; j < passwordLength; j += 1)
    randomString += variable[Math.floor(Math.random() * variable.length)];
  return randomString;
}
