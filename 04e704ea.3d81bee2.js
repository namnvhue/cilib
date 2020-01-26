(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{126:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return b}));var i=n(1),r=n(9),a=(n(0),n(193)),o={title:"GBest PSO"},l={id:"usage/gbestpso",title:"GBest PSO",description:"# Global Best PSO (GBestPSO)",source:"@site/docs/usage/gbestpso.md",permalink:"/docs/usage/gbestpso"},c=[{value:"Getting things ready",id:"getting-things-ready",children:[]}],s={rightToc:c},p="wrapper";function b(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(a.b)(p,Object(i.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h1",{id:"global-best-pso-gbestpso"},"Global Best PSO (GBestPSO)"),Object(a.b)("p",null,"The ",Object(a.b)("inlineCode",{parentName:"p"},"GBestPSO")," is the canonical version of the PSO. It is popular, not\nonly, because it is the original version of the algorithm (which is cited\noften within literature), but is also a simple algorithm to implement."),Object(a.b)("p",null,"As with all algorithms modelled as a function, the type of the ",Object(a.b)("inlineCode",{parentName:"p"},"GBestPSO"),"\nis simply defined as:"),Object(a.b)("pre",null,Object(a.b)("code",Object(i.a)({parentName:"pre"},{}),"List[Particle[S,A]] => RVar[List[Particle[S,A]]]\n")),Object(a.b)("p",null,"where a collection of entities are transformed from a given set of\nentities to a new collection of entities, with randomness applied. This process\nis then repeatedly reapplied, until a stopping condition is reached."),Object(a.b)("p",null,"We're going to exclude the import statements simply for brevity, but the reader\nis encouraged to examine the example algorithm definition in the ",Object(a.b)("inlineCode",{parentName:"p"},"examples"),"\nsub-module of the project source."),Object(a.b)("h2",{id:"getting-things-ready"},"Getting things ready"),Object(a.b)("p",null,"In order to define an experiment, there are a couple of things we need to\nget ready first. The most obvious should be that there needs to be some kind\nof problem, upon which we will be executing the ",Object(a.b)("inlineCode",{parentName:"p"},"GBestPSO"),"."),Object(a.b)("p",null,"As the very first step, we need to get the needed imports in scope:"),Object(a.b)("pre",null,Object(a.b)("code",Object(i.a)({parentName:"pre"},{className:"language-scala"}),"import cilib._\nimport cilib.pso._\nimport cilib.exec._\n\nimport eu.timepit.refined.auto._\n\nimport scalaz.effect._\nimport scalaz.effect.IO.putStrLn\nimport spire.implicits._\nimport spire.math.Interval\n\nimport cilib.syntax.algorithm._\n\nimport scalaz._\nimport Scalaz._\n")),Object(a.b)("p",null,"Next, we define the ",Object(a.b)("inlineCode",{parentName:"p"},"GBestPSO")," itself. The ",Object(a.b)("inlineCode",{parentName:"p"},"GBestPSO")," is defined to use a velocity\nupdate equation that uses the personal best of the current particle and then the\ncollection's current best particle to determine the new velocity vector for the\ncurrent particle within the algorithm."),Object(a.b)("p",null,'Let\'s define the two "particle attractors" which we need in the velocity update\nequation. Because these two values will attract or guide the particle in the search\nspace, we refer to them as ',Object(a.b)("inlineCode",{parentName:"p"},"Guide")," instances:"),Object(a.b)("pre",null,Object(a.b)("code",Object(i.a)({parentName:"pre"},{className:"language-scala"}),"val cognitive = Guide.pbest[Mem[Double],Double]\nval social    = Guide.gbest[Mem[Double]]\n")),Object(a.b)("p",null,"Again, we need to provide some type parameters to keep the compiler happy, but\nin this case we need to provide a type called ",Object(a.b)("inlineCode",{parentName:"p"},"Mem[Double]"),", which is needed to\ntrack the memory of a particle and at the same time, fulfills the function\nconstraints of the PSO algorithm itself: that the algorithm participants must\ncater for a ",Object(a.b)("inlineCode",{parentName:"p"},"HasMemory")," instance which exists for the ",Object(a.b)("inlineCode",{parentName:"p"},"Mem[Double]")," type."),Object(a.b)("p",null,"Now we can define the algorithm itself, providing some constants that are\nknown to provide convergent behaviour within the PSO:"),Object(a.b)("pre",null,Object(a.b)("code",Object(i.a)({parentName:"pre"},{className:"language-scala"}),"val gbestPSO = pso.Defaults.gbest(0.729844, 1.496180, 1.496180, cognitive, social)\nval iter = Iteration.sync(gbestPSO)\n")),Object(a.b)("p",null,'Now that the algorithm is defined, we need to define an "environment"\nwithin which this algorithm will execute. The environment is simply a\ncollection of vaues that defines the comparison and evaluator for the\nalgorithm, such as minimizing a benchmark problem.'),Object(a.b)("p",null,"Let's define such an environment using a simple problem, borrowing the\nproblem definition from the ",Object(a.b)("a",Object(i.a)({parentName:"p"},{href:"https://github.com/ciren/benchmarks"}),"benchmarks sister\nproject"),". We will also be\nminimizing this problem and defining the bounds of the problem space."),Object(a.b)("pre",null,Object(a.b)("code",Object(i.a)({parentName:"pre"},{className:"language-scala"}),"val env =\n  Environment(\n    cmp = Comparison.dominance(Min),\n    eval = Eval.unconstrained(cilib.benchmarks.Benchmarks.spherical[NonEmptyList, Double]))\n\nval bounds = Interval(-5.12,5.12)^30\n")),Object(a.b)("p",null,"Here we define a the evaluator, which is an unconstrained ",Object(a.b)("inlineCode",{parentName:"p"},"Eval"),"\ninstance, which uses the ",Object(a.b)("inlineCode",{parentName:"p"},"spherical")," function definiton from the\nbenchmarks project. We explicitly provide the needed type parameters\nto keep the compiler happy, that being that the ",Object(a.b)("inlineCode",{parentName:"p"},"Position")," is a\n",Object(a.b)("inlineCode",{parentName:"p"},"NonEmtpyList[Double]"),". Additionally, the ",Object(a.b)("inlineCode",{parentName:"p"},"cmp")," value defines ",Object(a.b)("em",{parentName:"p"},"how"),"\nthe optimization will be driven, which is to minimize the evaluator in\nthis example."),Object(a.b)("p",null,"Let's now define the entity collection that we need to given the\nalgorithm instance. The collection requires the problem bounds and\nalso defines how the entity instances will be initialized, once random\npositions are generated for the given problem space"),Object(a.b)("pre",null,Object(a.b)("code",Object(i.a)({parentName:"pre"},{className:"language-scala"}),"val swarm = Position.createCollection(PSO.createParticle(x => Entity(Mem(x, x.zeroed), x)))(bounds, 20)\n")),Object(a.b)("p",null,"The last requirement is to provide the RNG instance that will use used within\nthe algorithm. We define this value and then repeatedly run the algorithm\non the entity collection, stopping after 1000 iterations of the algorithm\nhave been performed"),Object(a.b)("pre",null,Object(a.b)("code",Object(i.a)({parentName:"pre"},{className:"language-scala"}),"val rng = RNG.fromTime // Seed the RNG with the current time of the computer\n\nval result = Runner.repeat(1000, iter, swarm).run(env).run(rng)\n\nresult._2 match {\n  case -\\/(error) =>\n    // Not much to do. The process failed with an error\n    throw error\n\n  case \\/-(value) =>\n    value.map(x => Lenses._position.get(x))\n}\n")))}b.isMDXComponent=!0},193:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return d}));var i=n(0),r=n.n(i);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,i,r=function(e,t){if(null==e)return{};var n,i,r={},a=Object.keys(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=r.a.createContext({}),p=function(e){var t=r.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l({},t,{},e)),n},b=function(e){var t=p(e.components);return r.a.createElement(s.Provider,{value:t},e.children)},h="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},u=Object(i.forwardRef)((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,o=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),b=p(n),h=i,u=b["".concat(o,".").concat(h)]||b[h]||m[h]||a;return n?r.a.createElement(u,l({ref:t},s,{components:n})):r.a.createElement(u,l({ref:t},s))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=u;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[h]="string"==typeof e?e:i,o[1]=l;for(var s=2;s<a;s++)o[s]=n[s];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"}}]);