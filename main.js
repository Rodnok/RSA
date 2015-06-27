function podzielna(a) {
    var b;
  with(Math)
  {
      b=floor(sqrt(a));
  }
    var c=false;
  for(var i=2;i<=b;i++)
    {
        if(a%i==0){
            c=true;
            break;
        }
    }
  return c;
} 
function genFirst()
{
    var tab = new Array(200);
    
    with(Math){
        d= floor((random()*10000)+1000);
    }
    j= 0;
    
    while(j<200)
    {
        if(!podzielna(d)){
            tab[j] = d;
            j++;
        }
        d++;
    }
    j=Math.floor((Math.random()*50)+0);
    var p = tab[j];
    var d = tab[100-j];
    return {
        d: d,
        p: p
    };
}
function euler(a)
{
    var prime = 2, foundBefore = 0, count = 1, i = 0;
    while(a!=1)
    {
        if(a%prime == 0)
        {
            if(foundBefore)
            {
                count *= prime;
            }
            else {
                count*= prime -1;
                foundBefore = 1;
            }
            a = a/prime;
        }
        else
        {
            foundBefore = 0;
            prime = findNextPrime(prime);
        }
    }
    return count;
}
function findNextPrime(prev)
{
    var next = prev;
    while(1)
    {
        ++next;
        if(!podzielna(next))
        {
            return next;
        }
    } 
}
function genWzFirst(a, b, p) {
    var ax,bx,t;
    for(var i=a; i<=b; i++)
    {
        ax=i;
        bx=p;
        while(bx)
        {
            t = bx;
            bx = ax % bx;
            ax = t;
        }
        if(ax==1)
        {
            return i;
        }
    }
}
function inv_mod(a, m)
{
    var xa = 1,
        xm = 0,
        ya = 0,
        ym = 1,
        c = 0,
        mod = m;
    a=a%m;
    while(a&&m)
    {
        if(a>m)
        {
            c = a/m;
            a = a%m;
            xa = xa-xm*c;
            ya = ya-ym*c;
        }
        else {
            c = m / a;
            m = m % a;
            xm = xm - xa * c;
            ym = ym - ya * c;
        }
    }
    if(a)
    {
        return (xa<0)?xa+mod:xa;
    }
    else return (xm<0)?xm+mod:xm;
}
function Round(n, k)
{
    var factor = Math.pow(10, k+1);
    n = Math.round(Math.round(n*factor)/10);
    return n/(factor/10);
}

function genKey()
{
    var d, e, eu;
    var newFirst = genFirst();
    var n = newFirst.d * newFirst.p;
    eu = euler(n);
    e = genWzFirst(2,10000, eu);
    d = inv_mod(e,eu);
    d = Round(d,0);

    document.writeln("p = " + newFirst.p + ", q = " + newFirst.d + "<br/>");
    document.writeln("n = " + n + ", phi = " + eu + ", e = "+ e +", d = " + d + "<br/>");
    document.writeln("Klucz publiczny = (" + e + ", " + n + ").<br/>");
    document.writeln("Klucz prywatny = (" + d + ", " + n + ").<br/>");

    return {
        public_key: e,
        private_key: d,
        n: n
    }
}
function expmod( base, exp, mod ){
  if (exp == 0) return 1;
  if (exp % 2 == 0){
    return Math.pow( expmod( base, (exp / 2), mod), 2) % mod;
  }
  else {
    return (base * expmod( base, (exp - 1), mod)) % mod;
  }
}
function code()
{
    var codestr = document.getElementById("input").value;
    var codestr2 = new String();
    var newKey = new genKey();
    var n = newKey.n,
	e = newKey.public_key,
	d = newKey.private_key;
    var tab = new Array(codestr.length);
    var tab_c = new Array(codestr.length);
    for(i = 0; i<codestr.length; i++)
    {
        tab[i] = parseInt(codestr.charCodeAt(i));
	    tab[i] = expmod(tab[i], e, n);
    }
	document.getElementById("output").value = tab;
	
	 for(i = 0; i<codestr.length; i++)
    {
        tab_c[i] = expmod(tab[i], d, n);
        codestr2 += String.fromCharCode(tab_c[i]);
    }
	document.getElementById("uncode").value = codestr2;
}
code();

