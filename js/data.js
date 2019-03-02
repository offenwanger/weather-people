const dataset = {
  nodes: [
    /* 0 Initial prompt*/
    {text: "Hello, this is the WeatherBug. I can help you hunt out the weather information you need. What would you like to know?", startNode:1},
    /* 1 Canned info */
    {text: "<weather> on <timeframe> [in <location>] will be rainy."},
    /* 2 Prompt for termination or further interaction */
    {text: "Is there anything else you would like to know?"},
    /* 3 Acknowledge error */
    {text: "I seem to be having some trouble helping you."},
    /* 4 Alternatives */
    {text: "If there’s a feature that I’m not able to provide, we would appreciate it if you could file feedback at weatherbugs.com"},
    /* 5 no match rapid reprompt */
    {text: "I’m sorry, what did you ask?"},
    /* 6 Escalate detail */
    {text: "Sorry, I’m only a WeatherBug so my language is limited. "+
           "You can ask for things like \“Will it rain on Thursday?\” "+
           "or \“What’s the weather like today?\”"},
    /* 7 Nothing heard apology */
    {text: "I’m sorry, I didn’t hear you say anything. Wake me up again "+
           "when you have another question."},
    /* 8 Nothing rapid reprompt */
    {text: "Sorry, I didn’t hear anything, what would you like to know?"},
    /* 9 End */
    {text: "I’m going to sleep now."},
    /* 10 Canned info repeat */
    {text: "<weather> on <timeframe> [in <location>] will be rainy."},
    
  ], edges: [
    
    {source: 0, target: 8, label: "nothing"},
    {source: 0, target: 1, label: "weather inquiry"},
    {source: 0, target: 5, label: "???"},

    {source: 1, target: 2, label: ""},

    {source: 2, target: 9, label: "nothing"},
    {source: 2, target: 10, label: "repeat request"},
    {source: 2, target: 5, label: "???"},

    {source: 3, target: 4, label: ""},

    {source: 5, target: 6, label: "???"},
    {source: 5, target: 1, label: "weather inquiry"},
    {source: 5, target: 7, label: "nothing"},

    {source: 6, target: 7, label: "nothing"},
    {source: 6, target: 1, label: "weather inquiry"},
    {source: 6, target: 4, label: "???"},

    // Alternatives goes to end
    {source: 4, target: 9, label: ""},

    // Hearing nothing after no match causes termination
    {source: 7, target: 9, label: ""},

    {source: 8, target: 1, label: "weather inquiry"},
    {source: 8, target: 9, label: "nothing"},

    {source: 10, target: 3, label: "repeat request"},
    {source: 10, target: 5, label: "???"},
    {source: 10, target: 7, label: "nothing"},

  ]
};
