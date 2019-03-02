const dataset = {
  nodes: [
    { name: "initial_prompt",
     text: "Hello, this is the WeatherBug. I can help you hunt out "+
           "the weather information you need. What would you like to "+
           "know?", startNode:1},
   
    { name:"canned_info",
      text: "<weather> on <timeframe> [in <location>] will be rainy."},
   
    /* 2 Prompt for termination or further interaction */
    { name: "more_info_or_terminate",
      text: "Is there anything else you would like to know?"},
   
      /* 3 Acknowledge error */
    {name: "acknowledge_error",
      text: "I seem to be having some trouble helping you."},
    
      /* 4 Alternatives */
    {name: "alternative",
    text: "If there’s a feature that I’m not able to provide, "+
          "we would appreciate it if you could file feedback at "+
          "weatherbugs.com",
          isEnd: true},
    
    /* 5 no match rapid reprompt */
    { name:"no_match_rapid_reprompt",
      text: "I’m sorry, what did you ask?"},

    /* 6 Escalate detail */
    { name: "escalate_detail",
      text: "Sorry, I’m only a WeatherBug so my language is limited. "+
           "You can ask for things like \“Will it rain on Thursday?\” "+
           "or \“What’s the weather like today?\”"},

           /* 7 Nothing heard apology */
    { name: "sorry_nothing_heard_end",
      text: "I’m sorry, I didn’t hear you say anything. Wake me up again "+
           "when you have another question.",
           isEnd: true},
    /* 8 Nothing rapid reprompt */
    { name: "nothing_rapid_reprompt",
      text: "Sorry, I didn’t hear anything, what would you like to know?"},
    /* 9 End */
    { name: "end",
      text: "I’m going to sleep now.",
      isEnd: true},
    /* 10 Canned info repeat */
    { name: "repeat_canned_info",
      text: "<weather> on <timeframe> [in <location>] will be rainy."},
    
  ], edges: [
    {source: "initial_prompt", label: "Weather Inquiry", target: "canned_info"},
    {source: "initial_prompt", label: "nothing", target: "nothing_rapid_reprompt"},
    {source: "initial_prompt", label: "???", target: "no_match_rapid_reprompt"},

    {source: "canned_info", target: "more_info_or_terminate"},

    {source: "more_info_or_terminate", label: "Weather Inquiry", target: "canned_info"},
    {source: "more_info_or_terminate", label: "nothing", target: "nothing_rapid_reprompt"},
    {source: "more_info_or_terminate", label: "???", target: "no_match_rapid_reprompt"},
    {source: "more_info_or_terminate", label: "Repeat Request", target: "repeat_canned_info"},

    {source: "repeat_canned_info", label: "Weather Inquiry", target: "canned_info"},
    {source: "repeat_canned_info", label: "nothing", target: "nothing_rapid_reprompt"},
    {source: "repeat_canned_info", label: "???", target: "no_match_rapid_reprompt"},
    {source: "repeat_canned_info", label: "Repeat Request", target: "acknowledge_error"},

    {source:"acknowledge_error", target: "alternative"},

    {source: "nothing_rapid_reprompt", label: "Weather Inquiry", target: "canned_info"},
    {source: "nothing_rapid_reprompt", label: "nothing", target: "sorry_nothing_heard_end"},
    {source: "nothing_rapid_reprompt", label: "???", target: "no_match_rapid_reprompt"},

    {source: "no_match_rapid_reprompt", label: "Weather Inquiry", target: "canned_info"},
    {source: "no_match_rapid_reprompt", label: "nothing", target: "escalate_detail"},
    {source: "no_match_rapid_reprompt", label: "???", target: "escalate_detail"},

    {source: "escalate_detail", label: "Weather Inquiry", target: "canned_info"},
    {source: "escalate_detail", label: "nothing", target: "end"},
    {source: "escalate_detail", label: "???", target: "alternative"},
  ]
};

//     {source: 1, target: 2, label: ""},

//     {source: 2, target: 9, label: "nothing"},
//     {source: 2, target: 10, label: "repeat request"},
//     {source: 2, target: 5, label: "???"},

//     {source: 3, target: 4, label: ""},

//     {source: 5, target: 6, label: "???"},
//     {source: 5, target: 1, label: "weather inquiry"},
//     {source: 5, target: 7, label: "nothing"},

//     {source: 6, target: 7, label: "nothing"},
//     {source: 6, target: 1, label: "weather inquiry"},
//     {source: 6, target: 4, label: "???"},

//     // Alternatives goes to end
//     {source: 4, target: 9, label: ""},

//     // Hearing nothing after no match causes termination
//     {source: 7, target: 9, label: ""},

//     {source: 8, target: 1, label: "weather inquiry"},
//     {source: 8, target: 9, label: "nothing"},

//     {source: 10, target: 3, label: "repeat request"},
//     {source: 10, target: 5, label: "???"},
//     {source: 10, target: 7, label: "nothing"},

//   ]
// };
