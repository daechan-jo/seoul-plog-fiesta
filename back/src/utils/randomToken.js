/**@비밀번호 토큰 생성 랜덤 함수*/
function createRandomToken() {
  const variable =
    '0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z'.split(
      ',',
    );
  const passwordLength = 8;

  var randomString = '';
  for (var j = 0; j < passwordLength; j++)
    randomString += variable[Math.floor(Math.random() * variable.length)];
  return randomString;
}

module.exports = { createRandomToken };
