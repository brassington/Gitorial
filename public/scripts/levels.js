
var steps = [
    [//*********************************** BASIC MATHS
        { 
            f : function () {
                var a = randomInt(1, 6);
                var b = randomInt(1, 6);
                return a + ' + ' + b + ';';
            },
            timeoutTime: 10000
        },{
            f : function () {
                var a = randomInt(1, 5);
                var b = randomInt(2, 5);
                return a + ' * ' + b + ';';
            },
            timeoutTime: 8000
        }
    ],[ //*********************************** VARIABLES
        {
            f : function () {
                var a = randomInt(1, 6);
                var b = randomInt(1, 6);
                if (b === a) {
                    b += 2;
                }
                return "var a = " + a + ";\na + " + b + ';';
            },
            timeoutTime: 10000
        },{
            f : function () {
                var a = randomInt(1, 6);
                var b = randomInt(1, 6);
                if (b === a) {
                    b += 2;
                }
                return "var a = " + a + ";\nvar b = " + b + ";\na + b;";
            },
            timeoutTime: 10000
        }
    ],[ //*********************************** STRINGS CONCATENATIONS
        {
            f : function () {
                var a = randomLetters(2);
                var b = randomLetters(2);
                return "var a = '" + a + "';\nvar b = '" + b + "';\na + b;";
            },
            timeoutTime: 17000,
            errorExpected: true
        },{
            f : function () {
                var a = randomLetters(2);
                var b = randomInt(10, 99);
                return "var a = '" + a + "';\nvar b = '" + b + "';\na + b;";
            },
            timeoutTime: 13000
        },{
            f : function () {
                var a = randomLetters(3);
                var b = randomLetter() + randomInt(10, 99);
                return "var a = '" + a + "';\nvar b = '" + b + "';\na + b;";
            },
            timeoutTime: 13000
        }
    ],[ //*********************************** STRING OR INTEGERS ?
        {
            f : function () {
                var a = randomInt(0, 5) + '';
                var b = randomInt(0, 6) + '';
                return "var a = '" + a + "';\nvar b = '" + b + "';\na + b;";
            },
            timeoutTime: 15000,
            errorExpected: true
        },{
            f : function () {
                var a = randomInt(0, 5);
                var b = randomInt(0, 6);
                if (b === a) {
                    b += 2;
                }
                return "var a = " + a + ";\nvar b = " + b + ";\na + b;";
            }
        },{
            f : function () {
                var a = randomInt(0, 5) + '';
                var b = randomInt(0, 6) + '';
                return "var a = '" + a + "';\nvar b = '" + b + "';\na + b;";
            }
        }
    ],[ //*********************************** OVERRIDING VARS
        {
            f : function () {
                var a = randomInt(0, 5);
                var b = randomInt(0, 6);
                var c = randomInt(0, 4);
                if (b === a) {
                    b += 2;
                }
                return "var a = " + a + ";\na = " + b + ";\na + " + c + ";";
            }
        },{
            f : function () {
                var a = randomInt(0, 5);
                var b = randomInt(1, 4);
                var c = randomInt(0, 4);
                return "var a = " + a + ";\na = a + " + b + ";\na + " + c + ";";
            }
        }
    ],[ //*********************************** FUNCTIONS
        {
            f : function () {
                var a = randomInt(0, 6);
                var b = randomInt(0, 6);
                if (b === a) {
                    b += 2;
                }
                return "function hello (a, b) {\n\treturn a + b;\n}\n\nhello(" + a + ", " + b + ");";
            },
            timeoutTime: 15000
        },{
            f : function () {
                var a = randomInt(1, 4);
                var b = randomInt(2, 4);
                if (b === a) {
                    b += 1;
                }
                return "function hello (a, b) {\n\treturn a * b;\n}\n\nhello(" + a + ", " + b + ");";
            },
            timeoutTime: 13000
        },{
            f : function () {
                var a = randomInt(2, 6);
                return "function hello (a) {\n\treturn a * a;\n}\n\nhello(" + a + ");";
            },
            timeoutTime: 18000
        },{
            f : function () {
                var a = randomInt(1, 24);
                return "function hello (a) {\n\treturn a;\n}\n\nhello(" + a + ");";
            },
            timeoutTime: 13000
        },{
            f : function () {
                var a = randomInt(0, 5);
                var b = randomInt(0, 5);
                if (b === a) {
                    b += 2;
                }
                return "function hello () {\n\treturn " + a + ";\n}\n\nhello() + " + b + ";";
            },
            timeoutTime: 15000
        }
    ],[ //*********************************** LENGTH
        {
            f : function () {
                var a = randomLetters(randomInt(2, 8));
                return "var a = '" + a + "';\na.length;";
            },
            timeoutTime: 10000,
            errorExpected: true,
            times: 2
        },{
            f : function () {
                var a = [];
                for (var i=0; i < randomInt(3, 8); i++) {
                    a.push(Math.random() < 0.5 ? randomInt(1, 10)+'' : "'" + randomLetter() + "'");
                };
                return "var a = [" + a.join(', ') + "];\na.length;";
            },
            errorExpected: true,
            timeoutTime: 12000,
            times: 2
        }
    ],[ //*********************************** ARRAYS POSITION
        {
            f : function () {
                var a = [];
                for (var i=0; i < randomInt(3, 8); i++) {
                    a.push(Math.random() < 0.5 ? randomInt(1, 10)+'' : "'" + randomLetter() + "'");
                };
                return "var a = [" + a.join(', ') + "];\na[0];";
            },
            timeoutTime: 15000,
            errorExpected: true,
            times: 2
        },{
            f : function () {
                var a = [];
                for (var i=0; i < randomInt(3, 8); i++) {
                    a.push(Math.random() < 0.5 ? randomInt(1, 10)+'' : "'" + randomLetter() + "'");
                };
                var b = randomInt(1, a.length-1);
                return "var a = [" + a.join(', ') + "];\na["+b+"];";
            },
            times: 2
        },{
            f : function () {
                var a = [];
                var l = randomInt(4, 7);
                for (var i=0; a.length < l; i++) {
                    var letter = randomLetter();
                    if (a.indexOf(letter) === -1) {
                        a.push(letter);
                    }
                };
                var b = randomInt(0, a.length-1);
                return "var a = ['" + a.join("', '") + "'];\na.indexOf('"+a[b]+"');";
            },
            timeoutTime: 15000,
            errorExpected: true
        }
    ],[ //*********************************** BOOLEANS
        {
            f : function () {
                var a = randomInt(1, 30);
                var b = Math.random() < 0.5 ? a : randomInt(1, 30);
                return a + " === " + b + ";";
            },
            timeoutTime: 10000,
            errorExpected: true,
            times: 2
        },{
            f : function () {
                var a = randomInt(1, 30);
                var b = Math.random() < 0.5 ? a : randomInt(1, 30);
                return a + " !== " + b + ";";
            },
            timeoutTime: 10000,
            errorExpected: true,
            times: 2
        },{
            f : function () {
                var a = randomInt(1, 30);
                var b = Math.random() < 0.5 ? a : randomInt(1, 30);
                return a + " === '" + b + "';";
            },
            timeoutTime: 20000
        },{
            f : function () {
                var a = randomInt(1, 30);
                var b = randomInt(1, 30);
                if (b === a) {
                    b += 2;
                }
                return a + " < " + b + ";";
            },
            timeoutTime: 13000
        },{
            f : function () {
                var a = randomInt(1, 30);
                var b = Math.random() < 0.5 ? a : randomInt(1, 30);
                return "var a = " + a + ";\na " + (Math.random() < 0.5 ? '!' : '=') + "== " + b + ";";
            },
            times: 2,
            timeoutTime: 12000
        }
    ],[ //*********************************** BOOLEANS OR AFFECTATION ?
        {
            f : function () {
                var a = randomInt(1, 5);
                var b = randomInt(0, 5);
                var c = randomInt(1, 3);
                if (b === a) {
                    b += 2;
                }
                return "var a = " + a + ";\na = " + b + ";\na + " + c + ";";
            }
        },{
            f : function () {
                var a = randomInt(1, 7);
                var b = Math.random() < 0.5 ? a : randomInt(1, 20);
                var c = randomInt(1, 3);
                return "var a = " + a + ";\na === " + b + ";\na + " + c + ";";
            },
            times: 2
        },{
            f : function () {
                var a = randomInt(0, 6);
                var b = randomInt(0, 6);
                var c = randomInt(1, 3);
                if (b === a) {
                    b += 2;
                }
                return "var a = " + a + ";\na = " + b + ";\na + " + c + ";";
            },
            times: 2
        }
    ],[ //*********************************** CONDITIONS
        {
            f : function () {
                var a = randomInt(0, 5);
                var b = randomInt(0, 5);
                var c = randomInt(1, 4);
                var d = randomInt(1, 4);
                var e = d + randomInt(1, 4);
                
                if (b === a) {
                    b += 2;
                }
                return "var a = " + a + ";\nif (" + d + " < " + e + ") {\n\ta = " + b + ";\n}\na + " + c + ";";
            }
        },
        {
            f : function () {
                var a = randomInt(0, 5);
                var b = randomInt(0, 5);
                var c = randomInt(1, 4);
                var d = randomInt(1, 4);
                var e = d + randomInt(1, 4);
                
                if (b === a) {
                    b += 2;
                }
                return "var a = " + a + ";\nif (" + e + " < " + d + ") {\n\ta = " + b + ";\n}\na + " + c + ";";
            }
        },{
            f : function () {
                var a = randomInt(0, 5);
                var b = randomInt(0, 5);
                var c = randomInt(1, 4);
                var d = randomInt(1, 4);
                var e = d + randomInt(1, 4);
                if (b === a) {
                    b += 2;
                }
                return "if (" + d + " < " + e + ") {\n\tvar a = " + a + ";\n} else {\n\tvar a = " + b + ";\n}\na + " + c + ";";
            }
        },{
            f : function () {
                var a = randomInt(0, 6);
                var b = randomInt(0, 6);
                var c = randomInt(1, 4);
                var d = randomInt(1, 4);
                var e = d + randomInt(1, 4);
                if (b === a) {
                    b += 2;
                }
                return "if (" + e + " < " + d + ") {\n\tvar a = " + a + ";\n} else {\n\tvar a = " + b + ";\n}\na + " + c + ";";
            }
        },{
            f : function () {
                var condition1 = randomInt(1, 10);
                var condition2;
                if (Math.random() < 0.5) {
                    condition2 = condition1;
                } else {
                    condition2 = randomInt(1, 10);
                }
                var a = randomInt(1, 5);
                var b = randomInt(1, 5);
                var c = randomInt(1, 4);
                if (b === a) {
                    b += 2;
                }
                return "if (" + condition1 + " === " + condition2 + ") {\n\tvar a = " + a + ";\n} else {\n\tvar a = " + b + ";\n}\na + " + c + ";";
            }
        }
    ],[ //*********************************** CONDITIONS - 2
        {
            f : function () {
                var condition1 = randomInt(1, 8);
                var condition2 = randomInt(4, 16);
                var condition3 = randomInt(1, 10);
                var condition4 = randomInt(1, 10);
                if (condition1 === condition2) {
                    condition1 += 2;
                }
                if (condition3 === condition4) {
                    condition3 += 2;
                }
                var a = randomInt(1, 6);
                var b = randomInt(1, 6);
                var c = randomInt(1, 6);
                var d = randomInt(1, 5);
                if (b === a) {
                    b += 2;
                }
                if (a === c) {
                    c += 2;
                }
                if (b === c) {
                    c += 1;
                }
                return "if (" + condition1 + " < " + condition2 + ") {\n\tvar a = " + a + ";\n} else if (" + condition3 + " < " + condition4 + ") {\n\tvar a = " + b + ";\n} else {\n\tvar a = " + c + ";\n}\na + " + d + ";";
            },
            times: 4
        }
    ],[ //*********************************** ADVANCED FUNCTIONS
        {
            f : function () {
                var a = randomInt(0, 6);
                var b = randomInt(0, 6);
                if (b === a) {
                    b += 2;
                }
                return "function hi (a, b) {\n\treturn a * b;\n}\n\nhi(" + a + ", " + b + ");";
            }
        },{
            f : function () {
                var a = randomInt(1, 5);
                var b = randomInt(2, 4);
                var c = randomInt(1, 2);
                return "function hi (a, b) {\n\tif (a < b) {\n\t\treturn a + b;\n\t} else {\n\t\treturn a * b;\n\t}\n}\n\nhi(" + a + ", " + b + ");";
            },
            times: 2
        },{
            f : function () {
                var a = randomInt(1, 5);
                var b = randomInt(1, 5);
                var c = randomInt(1, 3);
                var d = randomInt(2, 4);
                return "function hi (a, b) {\n\treturn a * b;\n}\n\nfunction hello (a, b) {\n\treturn a + b;\n}\n\nhi(" + c + ", " + d + ") + hello(" + a + ", " + b + ");";
            },
            timeoutTime: 70000
        },{
            f : function () {
                var a = randomInt(1, 4);
                var b = randomInt(2, 4);
                var c = randomInt(1, 5);
                return "function hi (a, b) {\n\treturn a * b;\n}\n\nfunction hello (a, b) {\n\treturn a + b;\n}\n\nvar a = hi(" + a + ", " + b + ");\nhello(a, " + c + ");";
            },
            timeoutTime: 70000
        },{
            f : function () {
                var a = randomInt(1, 4);
                var b = randomInt(2, 4);
                var c = randomInt(1, 5);
                return "function hi (a, b) {\n\treturn a * b;\n}\n\nfunction hello (a, b) {\n\treturn a + b;\n}\n\nhello(hi(" + a + ", " + b + "), " + c + ");";
            },
            timeoutTime: 70000
        },{
            f : function () {
                var a = randomInt(1, 5);
                var b = randomInt(2, 4);
                var c = randomInt(1, 2);
                return "function hi (a, b) {\n\treturn a * b;\n}\n\nfunction hello (a, b) {\n\treturn hi(a, b + " + c + ");\n}\n\nhello(" + a + ", " + b + ");";
            },
            timeoutTime: 90000
        }
    ]
];

/*  
    
    ,[ //*********************************** SCOPES
        {
            f : function () {
                var a = randomInt(1, 6);
                var b = randomInt(1, 5);
                var c = randomInt(1, 5);
                if (c === b) {
                    c += 1;
                }
                return "function hello () {\n\ta = a + " + b + ";\n\treturn;\n}\n\nvar a = " + a + ";\nhello();\na + " + c + ";";
            }
        },{
            f : function () {
                var a = randomInt(1, 6);
                var b = randomInt(1, 6);
                var c = randomInt(1, 4);
                if (b === a) {
                    b += 2;
                }
                return "function hello () {\n\ta = " + b + ";\n\treturn;\n}\n\nvar a = " + a + ";\na + " + c + ";";
            }
        },{
            f : function () {
                var a = randomInt(1, 6);
                var b = randomInt(1, 6);
                var c = randomInt(1, 4);
                if (b === a) {
                    b += 2;
                }
                return "function hello () {\n\tvar a = " + b + ";\n\treturn;\n}\n\nvar a = " + a + ";\nhello();\na + " + c + ";";
            }
        },{
            f : function () {
                var a = randomInt(1, 6);
                var b = randomInt(1, 5);
                var c = randomInt(1, 5);
                if (c === b) {
                    c += 1;
                }
                return "function hello () {\n\ta = a + " + b + ";\n\treturn;\n}\n\nvar a = " + a + ";\nhello();\na + " + c + ";";
            }
        },{
            f : function () {
                var a = randomInt(1, 6);
                var b = randomInt(1, 5);
                var c = randomInt(1, 5);
                var d = randomInt(1, 6);
                if (c === b) {
                    c += 1;
                }
                return "function hello (a) {\n\ta = a + " + b + ";\n\treturn;\n}\n\nvar a = " + a + ";\nhello(" + d + ");\na + " + c + ";";
            }
        }
        
    ]
];



// {'ee': 5}  a.ee
// imbrication objects / objets / arrays
// || && 
// for 
// null undefined
// constructors

*/