function jsTester(...e){if(1===e.length)return jsTester(null,...e);if(2===e.length)return jsTester({},...e);const[r,o,n]=e;let t=r,s=Promise.resolve().then(()=>(o&&console.log(o),n(t))).then((e=t)=>{t=e});return{test(...e){if(1===e.length)return jsTester(null,...e);const[r,o]=e;return s=s.then(()=>(r&&console.log("  "+r),o(t))).then(e=>{e?console.log("    %c✔ Passed","color: green;"):console.log("    %c✖ Failed","color: red;")},()=>{console.error("Error")}),this},end:()=>s}}module.exports=jsTester;
//# sourceMappingURL=js-tester.js.map
