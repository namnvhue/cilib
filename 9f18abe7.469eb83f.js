(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{163:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return r})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return b}));var i=n(1),a=n(9),o=(n(0),n(193)),r={},c={id:"design/step",title:"step",description:"# Step",source:"@site/docs/design/step.md",permalink:"/docs/design/step"},l=[],p={rightToc:l},s="wrapper";function b(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)(s,Object(i.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h1",{id:"step"},"Step"),Object(o.b)("p",null,"Apart from tracking the effect of randomness, a computational intelligence\nalgorithm requires some additional information:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"The optimization scheme (",Object(o.b)("inlineCode",{parentName:"li"},"Opt"),") required, either minimization or maximization"),Object(o.b)("li",{parentName:"ul"},"The fitness function evaluation instance, ",Object(o.b)("inlineCode",{parentName:"li"},"Eval"),", which calculates the quality of\nthe candidate solution")),Object(o.b)("p",null,"The result is a function, which uses a predefined set of values to generate\na ",Object(o.b)("inlineCode",{parentName:"p"},"RVar")," computation to which randomness still needs to be applied. The function\nis therefore of the shape"),Object(o.b)("pre",null,Object(o.b)("code",Object(i.a)({parentName:"pre"},{}),"(Opt,Eval[A]) => RVar[B]\n")),Object(o.b)("p",null,'The predefined set of values required for input is also referred to as the\n"environment". Given that the environment is decided once, at the beginning of\nthe execution process, we can factor out this common parameter using a Kleisli\narrow, on this case the ',Object(o.b)("inlineCode",{parentName:"p"},"ReaderT")," monad transformer is applicable, resulting\nin the final type of:"),Object(o.b)("pre",null,Object(o.b)("code",Object(i.a)({parentName:"pre"},{}),"ReaderT[RVar, (Opt,Eval[A]), B]\n")),Object(o.b)("p",null,"Because monad transformers are monads themselves, we can freely compose different\n",Object(o.b)("inlineCode",{parentName:"p"},"Step"),' instances to create a larger computation. The larger computation, being\ntermed the "algorithm". Due to the sequencing action of monads, ',Object(o.b)("inlineCode",{parentName:"p"},"Step")," instances\nare analogous to steps in algorithm pseudo-code."),Object(o.b)("p",null,"Now that the intention of ",Object(o.b)("inlineCode",{parentName:"p"},"Step"),' is clearer, lets have a look at some usage. Keep\nin mind that even though the final "shape" of the ',Object(o.b)("inlineCode",{parentName:"p"},"Step")," is defined, this does not\nlimit the manner in which we can create ",Object(o.b)("inlineCode",{parentName:"p"},"Step")," instances.\nWithin a PSO, each particle has several actions applied to it, in order to create\na new particle that occupies a different location within the problem search space."),Object(o.b)("p",null,"The canonical PSO algorithm iteratively alters the position (and state data) of each\nparticle to create a new particle for each within the collection. The new collection\nessentially replaces the original collection and this process repeats until some\nkind of stopping condition is met. Stopping condition logic is intentionally not\nincluded within the ",Object(o.b)("inlineCode",{parentName:"p"},"Step"),". The type for a PSO is then"),Object(o.b)("pre",null,Object(o.b)("code",Object(i.a)({parentName:"pre"},{}),"List[Particle[S,A]] => Particle[S,A] => Step[RVar,(Opt,Eval[A]),Particle[A]]\n")),Object(o.b)("p",null,"and the algorithm definition is:"),Object(o.b)("pre",null,Object(o.b)("code",Object(i.a)({parentName:"pre"},{className:"language-scala"}),"def pso[S](w: Double, c1: Double, c2: Double,\n  cognitive: Guide[S,Double], social: Guide[S,Double]\n)(implicit M: HasMemory[S,Double], V: HasVelocity[S,Double]\n): NonEmptyList[Particle[S,Double]] => Particle[S,Double] => Step[Double,Particle[S,Double]]  =\n  collection => x => for {\n    cog     <- cognitive(collection, x)\n    soc     <- social(collection, x)\n    vel     <- stdVelocity(x, soc, cog, w, c1, c2)\n    p       <- stdPosition(x, vel)\n    p2      <- evalParticle(p)\n    p3      <- updateVelocity(p2, vel)\n    updated <- updatePBest(p3)\n  } yield updated\n")),Object(o.b)("p",null,"That sure looks complex! Sure, there are a few things going on there, but it certainly\nis not complex - the syntax just makes the intention a little hidden due to the verbosity.\nThe ",Object(o.b)("inlineCode",{parentName:"p"},"pso")," function defines that there are some parameters that it requires\nfor the ",Object(o.b)("inlineCode",{parentName:"p"},"stdVelocity")," function, namely ",Object(o.b)("inlineCode",{parentName:"p"},"w"),", ",Object(o.b)("inlineCode",{parentName:"p"},"c1"),", ",Object(o.b)("inlineCode",{parentName:"p"},"c2"),". Next it requires two individual\n",Object(o.b)("inlineCode",{parentName:"p"},"Guide")," instances which are the particle attactors for the velocity update equation. In\nthe next parameter group is an implicit parameter that is constraining the types of\ndata elements ",Object(o.b)("inlineCode",{parentName:"p"},"pso")," can work with. In this case, the ",Object(o.b)("inlineCode",{parentName:"p"},"pso")," requires that all ",Object(o.b)("inlineCode",{parentName:"p"},"Particle"),"\ninstances (which is just an alias for the type ",Object(o.b)("inlineCode",{parentName:"p"},"Entity[S,Position[Double]]"),")\nmust have a ",Object(o.b)("inlineCode",{parentName:"p"},"HasMemory")," and ",Object(o.b)("inlineCode",{parentName:"p"},"HasVelocity")," instance available for the compiler to provide.\nAs mentioned previously, in the section about lenses and optics, these classy lens instances\nprevent ",Object(o.b)("inlineCode",{parentName:"p"},"Entity")," types that do not have a memory nor a velocity present in their\nstate parameter type. Again, we don't know what the value of ",Object(o.b)("inlineCode",{parentName:"p"},"S")," is at the definition\nlevel, it will be made concrete when we actually use the ",Object(o.b)("inlineCode",{parentName:"p"},"pso")," function."),Object(o.b)("p",null,"Every function within the for-comprehension is a function that yields a ",Object(o.b)("inlineCode",{parentName:"p"},"Step")," instance\nof the type ",Object(o.b)("inlineCode",{parentName:"p"},"Step[Double,Particle[S,Double]]")," (in this usage example). The individual\n",Object(o.b)("inlineCode",{parentName:"p"},"Step"),"s are then composed into a larger composition that ultimately results in the\ncreation of a new piece of data: the particle which replaces the particle identified\nby the parameter ",Object(o.b)("inlineCode",{parentName:"p"},"x"),"."),Object(o.b)("h1",{id:"iteration"},"Iteration"),Object(o.b)("p",null,"Algorithms can be executed either synchronously or asynchronously. Given an\nalgorithm definition like the definition of ",Object(o.b)("inlineCode",{parentName:"p"},"pso")," above, it may be passed into\nan iteration function which converts the signature of ",Object(o.b)("inlineCode",{parentName:"p"},"pso")," function into the\nshape:"),Object(o.b)("pre",null,Object(o.b)("code",Object(i.a)({parentName:"pre"},{}),"List[Particle[S,A]] => RVar[A,Particle[S,A]]\n")),Object(o.b)("p",null,"It is important to note that the manner of execution constrains the amount\nof parallelism that may be applied to the iteration process. The synchronous\nscheme can be completely parallelized as there is no reliance on the currently\nbuilding collection. The asynchronous process on the other hand builds the new\ncollection from a combination of the current and new collections. As a result\nof the manner in which the asynchronous process executes, parallelism is not\npossible due to the shared state that is managed during the execution process."))}b.isMDXComponent=!0},193:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return m}));var i=n(0),a=n.n(i);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},o=Object.keys(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=a.a.createContext({}),s=function(e){var t=a.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):c({},t,{},e)),n},b=function(e){var t=s(e.components);return a.a.createElement(p.Provider,{value:t},e.children)},u="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=Object(i.forwardRef)((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,r=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),b=s(n),u=i,d=b["".concat(r,".").concat(u)]||b[u]||h[u]||o;return n?a.a.createElement(d,c({ref:t},p,{components:n})):a.a.createElement(d,c({ref:t},p))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,r=new Array(o);r[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c[u]="string"==typeof e?e:i,r[1]=c;for(var p=2;p<o;p++)r[p]=n[p];return a.a.createElement.apply(null,r)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);