import { useState, useRef, useEffect } from "react";

const C = { red:"#D32F2F", redL:"#FFEBEE", green:"#2E7D32", greenL:"#E8F5E9", yellow:"#F9A825", yellowL:"#FFFDE7", blue:"#1565C0", blueL:"#E3F2FD", white:"#fff", text:"#212121", muted:"#757575" };

const QUOTES = [
  { text:"Education is the most powerful weapon which you can use to change the world.", author:"Nelson Mandela" },
  { text:"The future belongs to those who believe in the beauty of their dreams.", author:"Eleanor Roosevelt" },
  { text:"You don't have to be rich to get a great education. You just have to be determined.", author:"Unknown" },
  { text:"Every scholarship you apply for is a door you're choosing not to leave closed.", author:"ScholarMatch" },
  { text:"It always seems impossible until it's done.", author:"Nelson Mandela" },
  { text:"Success is the sum of small efforts, repeated day in and day out.", author:"Robert Collier" },
  { text:"The secret of getting ahead is getting started.", author:"Mark Twain" },
  { text:"Believe you can and you're halfway there.", author:"Theodore Roosevelt" },
  { text:"Financial hardship is not the end of your story. It's just the beginning of your fight.", author:"ScholarMatch" },
  { text:"The only limit to our realization of tomorrow is our doubts of today.", author:"Franklin D. Roosevelt" },
];

const DB = [
  { name:"Loran Award", amount:"$100,000", verified:true, org:"The Loran Scholars Foundation is a national charity that invests in young Canadians of exceptional character.", description:"Canada's most prestigious undergraduate award for character, service and leadership.", howToApply:"Online application with personal essays, two reference letters, and academic transcript. Shortlisted candidates attend regional and national selection events.", requirements:"Canadian citizen, entering 1st year undergrad, strong community involvement", deadline:"November 4", link:"https://loranscholar.ca", tags:["leadership","community","any","high-gpa"], checklist:["Write two personal essays","Gather two reference letters","Prepare academic transcript","Submit online application"] },
  { name:"Schulich Leader Scholarship", amount:"Up to $100,000", verified:true, org:"The Schulich Foundation funds Canada's largest STEM undergraduate scholarship program at partner universities.", description:"One of Canada's largest STEM scholarships for students entering science, technology, engineering or math.", howToApply:"Nominated by your high school principal. Submit academic records, personal statement, and two reference letters.", requirements:"Canadian high school graduate entering STEM at a partner university, nominated by principal", deadline:"April", link:"https://schulichleaders.com", tags:["stem","engineering","computer-science","high-gpa"], checklist:["Ask your principal to nominate you","Prepare academic records","Write personal statement","Gather two reference letters"] },
  { name:"TD Scholarship for Community Leadership", amount:"$70,000", verified:true, org:"TD Bank offers this scholarship to recognize young Canadians who create meaningful social change in their communities.", description:"Recognizes exceptional contributions to community through leadership and volunteerism.", howToApply:"Apply online with personal statement, community service records, two references, and transcripts.", requirements:"Canadian citizen, strong community involvement, entering post-secondary", deadline:"February", link:"https://td.com/scholarships", tags:["community","leadership","social-work","any"], checklist:["Document community service hours","Write personal leadership statement","Collect two references","Submit online"] },
  { name:"Vanier Canada Graduate Scholarship", amount:"$50,000/year", verified:true, org:"Vanier Canada Graduate Scholarships are funded by the Government of Canada to attract world-class doctoral students.", description:"One of Canada's most prestigious doctoral scholarships for academic excellence and leadership.", howToApply:"Nominated by a Canadian university. Submit research proposal, transcripts, three reference letters, and leadership statement.", requirements:"Pursuing PhD at a Canadian university, Canadian citizen or PR", deadline:"November", link:"https://vanier.gc.ca", tags:["research","stem","high-gpa","leadership"], checklist:["Contact graduate office","Prepare research proposal","Get three reference letters","Submit transcripts"] },
  { name:"RBC Future Launch Scholarship", amount:"$8,000", verified:true, org:"RBC's Future Launch program helps young Canadians build skills and confidence for the future of work.", description:"Helps young Canadians develop skills for the future economy.", howToApply:"Apply online with a short essay, proof of enrollment, and financial need documentation.", requirements:"Canadian resident aged 15–29, financial need, enrolled or planning post-secondary", deadline:"March 31", link:"https://rbc.com/futurelaunch", tags:["business","entrepreneurship","any","low-income"], checklist:["Write short essay on future goals","Gather proof of enrollment","Prepare financial need documents","Apply online"] },
  { name:"Questbridge Canada Partner Scholarship", amount:"Full Ride", verified:true, org:"QuestBridge is a national non-profit connecting high-achieving, low-income students with leading universities.", description:"Connects high-achieving low-income students with top Canadian universities.", howToApply:"Create a QuestBridge profile, submit essays, transcripts, and financial info.", requirements:"High achiever with significant financial need, Canadian citizen or resident", deadline:"September 26", link:"https://questbridge.org", tags:["high-gpa","any","community","low-income"], checklist:["Create QuestBridge profile","Write application essays","Gather transcripts","Submit financial information"] },
  { name:"Google Generation Canada Scholarship", amount:"$10,000", verified:true, org:"Google offers this scholarship to support underrepresented students pursuing computer science and technology careers.", description:"For students passionate about computer science and using tech for social impact.", howToApply:"Submit online application with two essays, academic transcripts, and one letter of recommendation.", requirements:"Enrolled or intending to enroll in CS/tech degree at Canadian university", deadline:"December 1", link:"https://buildyourfuture.withgoogle.com/scholarships", tags:["computer-science","coding","stem","engineering","high-gpa"], checklist:["Write two essays","Prepare transcripts","Request one reference letter","Submit online"] },
  { name:"Schulich School of Business Entrance Award", amount:"$25,000", verified:true, org:"York University's Schulich School of Business awards exceptional incoming students automatically upon acceptance.", description:"Merit-based award for outstanding students entering Schulich at York University.", howToApply:"Automatic consideration upon acceptance. Ensure strong personal profile and extracurriculars.", requirements:"Admitted to Schulich School of Business, 90%+ average, leadership qualities", deadline:"February", link:"https://schulich.yorku.ca", tags:["business","entrepreneurship","leadership","high-gpa"], checklist:["Apply to Schulich","Include strong extracurriculars","Maintain 90%+ average"] },
  { name:"Pierre Elliott Trudeau Foundation Scholarship", amount:"$40,000", verified:true, org:"The Trudeau Foundation is an independent charitable organization funding doctoral research addressing pressing Canadian societal issues.", description:"For doctoral students addressing critical societal challenges in Canada.", howToApply:"Submit research proposal, academic CV, writing samples, and three letters of reference.", requirements:"Canadian citizen applying to/enrolled in PhD at Canadian university", deadline:"December 1", link:"https://trudeaufoundation.ca", tags:["research","law","social-work","high-gpa"], checklist:["Prepare research proposal","Write academic CV","Gather three reference letters","Collect writing samples"] },
  { name:"Horatio Alger Canadian Scholarship", amount:"$5,000", verified:true, org:"The Horatio Alger Association honours the achievements of outstanding individuals who have overcome adversity to achieve success.", description:"For students who overcame adversity while maintaining integrity and academic commitment.", howToApply:"Online application with personal essays about challenges, two reference letters, proof of financial need.", requirements:"Canadian citizen, GPA 2.0+, demonstrated financial need", deadline:"October 25", link:"https://horatioalger.ca", tags:["any","community","low-income"], checklist:["Write essay about overcoming adversity","Gather two reference letters","Prepare financial need documents"] },
  { name:"Canada Service Corps Grant", amount:"$5,000", verified:true, org:"Canada Service Corps is a Government of Canada initiative that supports young people in giving back to their communities.", description:"Funds youth-led service projects that benefit Canadian communities.", howToApply:"Submit project proposal online describing initiative, expected impact, budget, and team.", requirements:"Canadian aged 15–30, community service project, no specific GPA requirement", deadline:"Rolling", link:"https://canada.ca/serviceCorps", tags:["community","entrepreneurship","leadership","social-work"], checklist:["Develop project idea","Write proposal with budget","Identify team members","Submit rolling application"] },
  { name:"Scotiabank Scholarship Program", amount:"$5,000", verified:true, org:"Scotiabank's scholarship program supports academically strong students across Canada who demonstrate financial need.", description:"Supports academically strong students with financial need entering Canadian universities.", howToApply:"Apply through Scotiabank's portal with financial documents, transcripts, personal essay, one reference.", requirements:"Canadian citizen, entering post-secondary, financial need, minimum 75% average", deadline:"March 15", link:"https://scotiabank.com/scholarships", tags:["any","business","community","low-income"], checklist:["Gather financial need documents","Prepare transcripts","Write personal essay","Apply by March 15"] },
  { name:"Indigenous Student Award – NWAC", amount:"$3,000", verified:true, org:"The Native Women's Association of Canada advocates for Indigenous women and offers this award to support their education.", description:"Supports Indigenous women and girls pursuing post-secondary education across Canada.", howToApply:"Submit proof of Indigenous identity, acceptance letter, personal statement, one reference.", requirements:"Indigenous Canadian student enrolled in post-secondary program", deadline:"June 1", link:"https://nwac.ca", tags:["any","community","social-work","indigenous"], checklist:["Gather proof of Indigenous identity","Get acceptance letter","Write personal statement","Submit by June 1"] },
  { name:"Bursary for Students with Disabilities – NEADS", amount:"$2,000", verified:true, org:"NEADS (National Educational Association of Disabled Students) advocates for post-secondary students with disabilities across Canada.", description:"Supports post-secondary students with disabilities across Canada.", howToApply:"Apply online with medical documentation, proof of enrollment, personal statement.", requirements:"Canadian student with documented disability enrolled in post-secondary", deadline:"June 30", link:"https://neads.ca", tags:["any"], checklist:["Gather medical documentation","Get proof of enrollment","Write personal statement","Apply by June 30"] },
  { name:"Gord Downie & Chanie Wenjack Fund", amount:"$2,500", verified:true, org:"The Gord Downie & Chanie Wenjack Fund advances reconciliation between Indigenous and non-Indigenous peoples in Canada.", description:"Funds reconciliation-focused projects by young Canadians committed to Indigenous awareness.", howToApply:"Submit project proposal describing reconciliation initiative, timeline, budget, and community impact.", requirements:"Canadian student with reconciliation or Indigenous-focused project", deadline:"Rolling", link:"https://downiewenjack.ca", tags:["community","social-work","arts","writing","indigenous"], checklist:["Develop reconciliation project idea","Write proposal","Create timeline and budget","Submit rolling application"] },
  { name:"Engineers Canada Scholarship", amount:"$5,000", verified:true, org:"Engineers Canada is the national organization of engineering regulators, supporting the next generation of Canadian engineers.", description:"Supports Canadian students entering accredited engineering programs.", howToApply:"Apply through Engineers Canada portal with transcripts, two engineering-related reference letters, personal statement.", requirements:"Canadian citizen entering accredited engineering program, strong math/science grades", deadline:"February 28", link:"https://engineerscanada.ca/scholarships", tags:["engineering","stem","high-gpa"], checklist:["Gather transcripts","Request two engineering references","Write personal statement","Apply by February 28"] },
  { name:"Canadian Medical Association Scholarship", amount:"$7,500", verified:true, org:"The CMA supports the next generation of Canadian physicians and healthcare leaders through this scholarship program.", description:"For students committed to pursuing medicine and improving Canadian healthcare.", howToApply:"Submit personal statement on healthcare vision, academic transcripts, two references from science teachers or healthcare professionals.", requirements:"Canadian student intending to pursue medicine or health sciences, strong academic record", deadline:"April 1", link:"https://cma.ca/scholarships", tags:["medicine","stem","community"], checklist:["Write personal statement on healthcare vision","Prepare transcripts","Get two references","Submit by April 1"] },
  { name:"Law Foundation of Ontario Scholarship", amount:"$6,000", verified:true, org:"The Law Foundation of Ontario supports access to justice and legal education for Ontario students.", description:"Supports Ontario students pursuing careers in law and access to justice.", howToApply:"Apply with personal statement on legal goals, transcripts, community involvement record, two references.", requirements:"Ontario resident, interest in law or social justice, entering post-secondary", deadline:"March", link:"https://lawfoundation.on.ca", tags:["law","social-work","community"], checklist:["Write personal statement on legal goals","Gather transcripts","Document community involvement","Submit by March"] },
  { name:"Terry Fox Humanitarian Award", amount:"$28,000", verified:true, org:"The Terry Fox Humanitarian Award celebrates students who embody Terry Fox's spirit of humanitarianism, courage, and determination.", description:"Celebrates students who embody Terry Fox's humanitarian spirit through community service.", howToApply:"Submit community service portfolio, personal essays on humanitarian work, two references, transcripts.", requirements:"Canadian citizen, strong community service record, entering post-secondary", deadline:"February 1", link:"https://terryfox.org/award", tags:["community","leadership","any","sports"], checklist:["Compile community service portfolio","Write personal essays","Gather two references","Submit by February 1"] },
  { name:"Microsoft Canada Scholarship", amount:"$10,000", verified:true, org:"Microsoft Canada supports students who want to use technology to create a more inclusive and innovative world.", description:"For Canadian students pursuing technology degrees who want to drive inclusive innovation.", howToApply:"Apply online with personal statement on tech vision, transcripts, one reference.", requirements:"Canadian student in CS, engineering or related tech field, interest in diversity in tech", deadline:"January", link:"https://microsoft.com/en-ca/diversity/programs", tags:["computer-science","engineering","stem","coding"], checklist:["Write personal statement on tech","Prepare transcripts","Request one reference","Apply in January"] },
  { name:"Canadian Nurses Foundation Scholarship", amount:"$3,000", verified:true, org:"The Canadian Nurses Foundation supports nursing research and student excellence to advance the nursing profession across Canada.", description:"Supports students entering nursing programs across Canada.", howToApply:"Apply with personal essay on nursing passion, transcripts, reference from a nurse or healthcare worker.", requirements:"Canadian citizen entering or enrolled in nursing program", deadline:"April 15", link:"https://cnf-fiic.ca", tags:["medicine","community","social-work"], checklist:["Write essay on nursing passion","Gather transcripts","Get healthcare reference","Apply by April 15"] },
  { name:"Pearson Scholars Program – UWC", amount:"Full scholarship", verified:true, org:"United World College Canada sends exceptional young Canadians to study the IB program at UWC campuses around the world.", description:"Sends exceptional Canadian students to United World College for two years of IB education.", howToApply:"Apply online with personal statement, two references, school report. Attend regional selection events.", requirements:"Canadian resident aged 16–17, exceptional character, global outlook", deadline:"October", link:"https://uwccanada.org", tags:["leadership","community","any","high-gpa"], checklist:["Write personal statement","Get two references","Obtain school report","Apply online"] },
  { name:"TELUS Friendly Future Foundation Scholarship", amount:"$5,000", verified:true, org:"The TELUS Friendly Future Foundation supports young Canadians who use technology to create positive change in their communities.", description:"For students using technology to make a positive difference in their communities.", howToApply:"Apply online with a project proposal or story of how you've used tech for social good, transcripts, one reference.", requirements:"Canadian student demonstrating use of technology for community benefit", deadline:"February", link:"https://telusfriendlyfuture.com", tags:["computer-science","community","stem","coding"], checklist:["Write story about tech for social good","Gather transcripts","Request one reference","Apply by February"] },
  { name:"BMO Scholarship Program", amount:"$4,000", verified:true, org:"BMO Financial Group offers scholarships for students with financial need who demonstrate academic excellence and community involvement.", description:"For students with strong academic records and financial need entering Canadian post-secondary.", howToApply:"Apply via BMO portal with transcripts, financial need documentation, personal essay.", requirements:"Canadian citizen, entering post-secondary, financial need, minimum 80% average", deadline:"March 31", link:"https://bmo.com/community", tags:["business","any","low-income"], checklist:["Prepare financial need documents","Gather transcripts","Write personal essay","Apply by March 31"] },
  { name:"Black Student Scholarship Fund – Ontario", amount:"$5,000", verified:true, org:"This fund was established to reduce financial barriers for Black students in Ontario pursuing post-secondary education.", description:"For Black students in Ontario pursuing post-secondary education in any field.", howToApply:"Apply with self-identification form, personal statement, transcripts, one community reference.", requirements:"Black-identified Ontario student entering post-secondary", deadline:"April 30", link:"https://blackscholarshipfund.ca", tags:["any","community","low-income","black"], checklist:["Complete self-identification form","Write personal statement","Gather transcripts","Apply by April 30"] },
  { name:"Mitacs Globalink Research Award", amount:"$6,000", verified:true, org:"Mitacs is a national non-profit that develops partnerships between academia and industry, supporting research and internships.", description:"Funds Canadian undergraduates to pursue research abroad at partner institutions.", howToApply:"Apply through Mitacs portal with research proposal, supervisor confirmation, academic CV, transcripts.", requirements:"Canadian undergraduate, identified research supervisor abroad, minimum B average", deadline:"Rolling", link:"https://mitacs.ca/globalink", tags:["research","stem","engineering","computer-science"], checklist:["Identify research supervisor abroad","Write research proposal","Prepare academic CV","Apply through Mitacs portal"] },
  { name:"Canadian Olympic Committee Scholarship", amount:"$10,000", verified:true, org:"The Canadian Olympic Committee supports high-performance athletes balancing sport and post-secondary education.", description:"Supports high-performance Canadian athletes pursuing post-secondary education.", howToApply:"Apply through provincial sport organization. Submit athletic record, transcripts, personal statement.", requirements:"Canadian competitive athlete, enrolled in or entering post-secondary", deadline:"March", link:"https://olympic.ca/scholarships", tags:["sports","community","any"], checklist:["Contact provincial sport organization","Compile athletic record","Gather transcripts","Apply by March"] },
  { name:"CIBC Youthvision Scholarship", amount:"$3,500", verified:true, org:"CIBC's Youthvision program supports young Canadians from disadvantaged backgrounds in achieving their post-secondary dreams.", description:"For youth from disadvantaged backgrounds with aspirations for higher education.", howToApply:"Apply through CIBC foundation with personal story, financial need documentation, community reference, transcripts.", requirements:"Canadian youth from underserved community, financial need, entering post-secondary", deadline:"April", link:"https://cibc.com/foundation", tags:["any","low-income","community"], checklist:["Write personal story","Gather financial need documents","Get community reference","Apply by April"] },
  { name:"NSERC Undergraduate Student Research Award", amount:"$4,500–$6,000", verified:true, org:"NSERC (Natural Sciences and Engineering Research Council of Canada) funds undergraduate research in natural sciences and engineering.", description:"Funds summer research projects for undergraduates in natural sciences and engineering.", howToApply:"Apply through a Canadian university supervisor. Submit research proposal, transcripts, supervisor confirmation.", requirements:"Canadian citizen enrolled in science or engineering undergrad, minimum B average", deadline:"Rolling", link:"https://nserc-crsng.gc.ca", tags:["stem","research","engineering","high-gpa"], checklist:["Find university research supervisor","Write research proposal","Gather transcripts","Apply through university"] },
  { name:"Inspirit Foundation Scholarship", amount:"$5,000", verified:true, org:"The Inspirit Foundation works to build an inclusive Canada by supporting young people committed to pluralism and anti-discrimination.", description:"For young Canadians working to build pluralism and combat discrimination.", howToApply:"Submit project or initiative description, personal essay on pluralism work, two references.", requirements:"Canadian youth aged 15–25, active work in pluralism or anti-discrimination", deadline:"April", link:"https://inspiritfoundation.org", tags:["social-work","community","law","leadership"], checklist:["Describe your pluralism initiative","Write personal essay","Gather two references","Apply by April"] },
  { name:"Terry Fox Humanitarian Award", amount:"$28,000", verified:true, org:"Named after Terry Fox, this award celebrates students with outstanding humanitarian values and community contribution.", description:"Celebrates students who embody Terry Fox's humanitarian spirit through community service.", howToApply:"Submit community service portfolio, personal essays on humanitarian work, two references, transcripts.", requirements:"Canadian citizen, strong community service record, entering post-secondary", deadline:"February 1", link:"https://terryfox.org/award", tags:["community","leadership","any","sports"], checklist:["Compile community service portfolio","Write personal essays","Gather two references","Submit by February 1"] },
  { name:"Conservation Council Scholarship", amount:"$3,000", verified:true, org:"The Conservation Council of Canada funds students committed to protecting Canadian natural environments and biodiversity.", description:"For Canadian students committed to environmental conservation and sustainability.", howToApply:"Submit personal statement on conservation work, evidence of environmental advocacy, transcripts, two references.", requirements:"Canadian student entering environmental studies, conservation involvement", deadline:"May 15", link:"https://conservationcanada.ca", tags:["environment","research","community"], checklist:["Write personal statement on conservation","Document environmental advocacy","Gather references","Submit by May 15"] },
  { name:"CBC Music Scholarship", amount:"$10,000", verified:true, org:"CBC Music supports exceptional young Canadian musicians in launching professional careers in any genre.", description:"For exceptionally talented young Canadian musicians launching professional careers.", howToApply:"Submit audio/video performance recording, artist biography, two professional music references.", requirements:"Canadian musician aged 16–25, exceptional talent in any musical genre", deadline:"February", link:"https://cbcmusic.ca/scholarships", tags:["music","arts"], checklist:["Record audio/video performance","Write artist biography","Get two music references","Submit by February"] },
  { name:"Indigenous Leadership Development Institute Award", amount:"$4,000", verified:true, org:"ILDI builds Indigenous leadership capacity by supporting youth in developing skills to benefit their communities and nations.", description:"Supports Indigenous youth developing leadership skills to benefit their communities.", howToApply:"Submit community leadership statement, proof of Indigenous identity, two references from community leaders.", requirements:"Indigenous Canadian youth, demonstrated or potential community leadership", deadline:"May", link:"https://ildi.ca", tags:["indigenous","leadership","community","social-work"], checklist:["Write community leadership statement","Gather proof of Indigenous identity","Get two community references","Apply by May"] },
  { name:"Youth Mental Health Canada Scholarship", amount:"$2,500", verified:true, org:"Youth Mental Health Canada is dedicated to improving the mental health of young Canadians through advocacy, education, and support.", description:"For students committed to improving mental health awareness and support for youth.", howToApply:"Submit personal statement on mental health advocacy, evidence of related activities, two references.", requirements:"Canadian student aged 15–25, involvement in mental health awareness or advocacy", deadline:"April 30", link:"https://ymhc.ngo", tags:["social-work","community","medicine"], checklist:["Write personal statement on mental health advocacy","Document related activities","Gather two references","Apply by April 30"] },
  { name:"Canadian Association of Physicists Scholarship", amount:"$3,000", verified:true, org:"The CAP is the professional association for physicists in Canada, supporting the next generation of Canadian physics students.", description:"For outstanding Canadian undergraduate students studying physics.", howToApply:"Apply through university physics department. Submit transcripts, research statement, two references.", requirements:"Canadian student enrolled in physics undergrad, minimum A average", deadline:"March", link:"https://cap.ca/programs/scholarships", tags:["stem","research","high-gpa"], checklist:["Apply through university physics department","Submit transcripts","Write research statement","Apply by March"] },
  { name:"WXN Future Leaders Scholarship", amount:"$3,000", verified:true, org:"Women's Executive Network (WXN) recognizes young Canadian women showing exceptional leadership potential in any field.", description:"Recognizes young Canadian women showing exceptional leadership potential.", howToApply:"Apply with personal leadership statement, extracurricular record, two references.", requirements:"Canadian woman in Grade 11 or 12, demonstrated leadership", deadline:"February 28", link:"https://wxnetwork.com", tags:["leadership","business","community"], checklist:["Write personal leadership statement","Document extracurriculars","Gather two references","Apply by February 28"] },
  { name:"Frank Knox Memorial Fellowship", amount:"USD $30,000", verified:true, org:"The Frank Knox Memorial Fellowship enables top Canadian students to pursue graduate studies at Harvard University.", description:"Enables top Canadian students to pursue graduate studies at Harvard University.", howToApply:"Apply through a Canadian university with research proposal, academic CV, three references.", requirements:"Canadian citizen pursuing graduate study at Harvard, exceptional academic record", deadline:"October", link:"https://frankknox.harvard.edu", tags:["high-gpa","research","leadership","any"], checklist:["Apply through Canadian university","Prepare research proposal","Get three references","Submit by October"] },
  { name:"National Ballet School Scholarship", amount:"$15,000", verified:true, org:"Canada's National Ballet School is one of the world's leading professional ballet training institutions.", description:"For exceptional young dancers pursuing professional training in Canada.", howToApply:"Audition at NBS, submit artistic portfolio, personal statement on dance journey, teacher reference.", requirements:"Exceptional dance talent, Canadian resident, committed to professional training", deadline:"January 31", link:"https://nbs-enb.ca", tags:["arts","music"], checklist:["Prepare NBS audition","Compile artistic portfolio","Write personal statement","Submit by January 31"] },
  { name:"Canadian Tire Jumpstart Scholarship", amount:"$2,500", verified:true, org:"Canadian Tire Jumpstart removes financial barriers for youth to participate in sport and physical activity.", description:"Supports youth who have shown leadership through sport and community involvement.", howToApply:"Apply online with proof of sport involvement, personal statement, one community reference, transcripts.", requirements:"Canadian youth aged 14–18, active in sport and community, financial need", deadline:"March", link:"https://jumpstart.canadiantire.ca", tags:["sports","community","leadership","low-income"], checklist:["Document sport involvement","Write personal statement","Get community reference","Apply by March"] },
  { name:"Chalmers Arts Fellowship", amount:"$15,000", verified:true, org:"The Ontario Arts Council's Chalmers Family Fund supports Canadian artists in advancing their artistic practice.", description:"Supports Canadian artists in any discipline to advance their practice.", howToApply:"Submit artistic portfolio, artist statement, professional CV, two references.", requirements:"Canadian artist, demonstrated artistic practice and community contribution", deadline:"October 1", link:"https://oc-ca.ca/chalmers", tags:["arts","music","writing"], checklist:["Compile artistic portfolio","Write artist statement","Prepare CV","Submit by October 1"] },
  { name:"Canadian Federation of University Women Award", amount:"$5,000", verified:true, org:"CFUW is a non-profit, non-partisan, volunteer-based organization that advances education and equality for women across Canada.", description:"Supports women pursuing higher education in any field across Canada.", howToApply:"Apply through local CFUW club with personal statement, transcripts, two references, financial need documentation.", requirements:"Canadian woman entering post-secondary, academic merit, financial need", deadline:"November 1", link:"https://cfuw.org/fellowships-awards", tags:["any","community","leadership","low-income"], checklist:["Find local CFUW club","Write personal statement","Gather two references","Apply by November 1"] },
  { name:"TD Bank Group Scholarship for Indigenous Students", amount:"$5,000", verified:true, org:"TD Bank supports Indigenous students pursuing post-secondary education in business and related fields.", description:"Supports Indigenous students pursuing post-secondary education in business or related fields.", howToApply:"Apply with proof of Indigenous identity, academic transcripts, personal statement, financial need documentation.", requirements:"Indigenous Canadian student in business or related program, financial need", deadline:"February", link:"https://td.com/indigenous-scholarships", tags:["indigenous","business","low-income","community"], checklist:["Gather proof of Indigenous identity","Prepare transcripts","Write personal statement","Apply by February"] },
  { name:"Environics Institute Youth Grant", amount:"$4,000", verified:true, org:"The Environics Institute conducts public interest research on the social condition of Canadians and supports youth researchers.", description:"For young Canadians conducting research on social, cultural or environmental issues.", howToApply:"Submit research proposal, academic CV, two references, preliminary findings if available.", requirements:"Canadian student with social/environmental research project, any province", deadline:"March 15", link:"https://environicsinstitute.org", tags:["environment","research","social-work"], checklist:["Develop research proposal","Prepare academic CV","Gather two references","Apply by March 15"] },
  { name:"Youth Science Canada Award", amount:"$4,000 + prizes", verified:true, org:"Youth Science Canada is a national charity that ignites STEM curiosity and celebrates youth innovation through science fairs.", description:"Recognizes outstanding Canadian youth science fair projects with real-world impact.", howToApply:"Register for Canada-Wide Science Fair, submit research project, compete at regional then national level.", requirements:"Canadian student in Grade 7–12 with original science or engineering project", deadline:"Varies by region", link:"https://youthscience.ca", tags:["stem","research","engineering","computer-science"], checklist:["Develop original science project","Register for regional science fair","Compete at regional level"] },
  { name:"Action Canada Fellowship", amount:"$10,000", verified:true, org:"Action Canada is a national leadership program that connects emerging leaders to tackle pressing Canadian challenges.", description:"For young Canadians developing policy solutions to national challenges.", howToApply:"Submit policy paper proposal, CV, two references, personal statement.", requirements:"Canadian aged 20–30 with demonstrated leadership, any field", deadline:"January", link:"https://actioncanada.ca", tags:["law","leadership","community","social-work"], checklist:["Write policy paper proposal","Prepare CV","Gather two references","Apply in January"] },
  { name:"Canadian Psychological Association Scholarship", amount:"$3,500", verified:true, org:"The CPA promotes the development and application of psychology in Canada, supporting the next generation of Canadian psychologists.", description:"For students entering psychology or mental health programs at Canadian universities.", howToApply:"Submit academic transcripts, personal statement on psychology goals, two academic references.", requirements:"Canadian student entering or enrolled in psychology or mental health program", deadline:"May 1", link:"https://cpa.ca/students/awards", tags:["social-work","research","medicine"], checklist:["Gather transcripts","Write personal statement","Get two academic references","Apply by May 1"] },
  { name:"Historica Canada Heritage Award", amount:"$2,000", verified:true, org:"Historica Canada is the country's largest organization dedicated to Canadian history, heritage, and citizenship education.", description:"For students passionate about Canadian history, heritage, and citizenship.", howToApply:"Submit a heritage project through Historica's portal, along with school endorsement.", requirements:"Canadian student Grade 7–12, original heritage project, any province", deadline:"February", link:"https://historicacanada.ca/awards", tags:["writing","social-work","law","community"], checklist:["Create original heritage project","Get school endorsement","Submit by February"] },
  { name:"Atkinson Foundation Fellowship", amount:"$20,000", verified:true, org:"The Atkinson Foundation supports journalism and communication that advances social and economic justice in Canada.", description:"For journalists and communicators dedicated to social justice reporting in Canada.", howToApply:"Submit portfolio, project proposal for social justice journalism, CV, two references.", requirements:"Canadian student in communications, focus on social justice issues", deadline:"January 31", link:"https://atkinsonfoundation.ca", tags:["writing","social-work","media","community"], checklist:["Compile journalism portfolio","Write project proposal","Gather two references","Submit by January 31"] },
];

const INTERESTS = ["STEM","Arts & Design","Business","Medicine & Health","Law & Politics","Education","Engineering","Computer Science","Environment","Social Work","Journalism","Psychology"];
const PASSIONS_PRESET = ["Community Service","Sports","Music","Writing","Coding","Research","Entrepreneurship","Travel","Public Speaking","Indigenous Culture","Film & Media","Social Justice"];
const GRADES = ["Grade 9","Grade 10","Grade 11","Grade 12"];
const GPAS = ["90–100%","80–89%","70–79%","60–69%","Below 60%"];
const PROVINCES = ["Alberta","British Columbia","Manitoba","New Brunswick","Newfoundland","Nova Scotia","Ontario","PEI","Quebec","Saskatchewan","Territories"];
const STUDY_LENGTHS = ["1–2 year college diploma","3–4 year undergraduate degree","5+ year professional degree","Master's degree","PhD / Doctoral"];
const INCOME_GOALS = ["Under $40k/year","$40k–$70k/year","$70k–$100k/year","$100k–$150k/year","$150k+/year"];
const UNIVERSITIES = ["University of Toronto","McGill","UBC","McMaster","Queen's","Western","U of Alberta","U of Calgary","Dalhousie","Simon Fraser","Concordia","York","Waterloo","Ottawa","Other / Not Sure"];
const FIRST_GEN = ["Yes, first in my family","No, family has attended","Not sure"];
const FINANCIAL_NEEDS = ["Very important – I need aid","Somewhat important","Not needed"];
const LANGUAGES = ["English","French","Both English & French","Other"];
const EXTRA = ["Student government","Volunteering","Sports team","Arts / Music","Part-time job","Religious group","None yet"];
const ETHNICITIES = ["Indigenous – First Nations","Indigenous – Métis","Indigenous – Inuit","Black / African Canadian","South Asian","East Asian","Southeast Asian","Middle Eastern","Latin American","White / Caucasian","Mixed / Multiracial","Prefer not to say"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS_IN_MONTH = 30;

function scoreMatch(item, form) {
  let s = 0;
  const iMap={"STEM":"stem","Computer Science":"computer-science","Engineering":"engineering","Medicine & Health":"medicine","Arts & Design":"arts","Business":"business","Law & Politics":"law","Education":"education","Environment":"environment","Social Work":"social-work","Journalism":"writing","Psychology":"social-work"};
  const allPassions=[...form.passions,...(form.customPassions||[])];
  const pMap={"Coding":"coding","Research":"research","Community Service":"community","Entrepreneurship":"entrepreneurship","Music":"music","Writing":"writing","Public Speaking":"public-speaking","Indigenous Culture":"community","Social Justice":"community","Film & Media":"arts","Sports":"sports"};
  form.interests.forEach(i=>{if(item.tags.includes(iMap[i]))s+=4;});
  allPassions.forEach(p=>{if(item.tags.includes(pMap[p])||item.tags.includes(p.toLowerCase()))s+=3;});
  if(item.tags.includes("any"))s+=1;
  if(item.tags.includes("high-gpa")&&["90–100%","80–89%"].includes(form.gpa))s+=3;
  if(item.tags.includes("low-income")&&form.financialNeed==="Very important – I need aid")s+=3;
  if(item.tags.includes("indigenous")&&form.ethnicity?.includes("Indigenous"))s+=5;
  if(item.tags.includes("black")&&form.ethnicity?.includes("Black"))s+=5;
  if(form.firstGen==="Yes, first in my family"&&item.tags.includes("community"))s+=2;
  if(item.tags.includes("leadership")&&form.extracurriculars?.includes("Student government"))s+=2;
  if(item.tags.includes("community")&&form.extracurriculars?.includes("Volunteering"))s+=2;
  if(item.tags.includes("sports")&&form.extracurriculars?.includes("Sports team"))s+=2;
  return s;
}

// ── UI ATOMS ──────────────────────────────────────────────────────────────────
function Tag({label,selected,color,onClick}){
  const col=color||C.blue;
  return <button onClick={onClick} style={{padding:"7px 13px",borderRadius:20,border:`2px solid ${selected?col:"#ddd"}`,background:selected?col+"22":C.white,color:selected?col:C.muted,cursor:"pointer",fontSize:13,fontWeight:selected?700:400,margin:3,transition:"all 0.18s"}}>{label}</button>;
}
function Inp({label,value,onChange,placeholder,type="text"}){
  return <div style={{marginBottom:14}}>
    <label style={{fontWeight:600,fontSize:13,color:C.text,display:"block",marginBottom:5}}>{label}</label>
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={{width:"100%",padding:"11px 14px",borderRadius:10,border:"1.5px solid #ddd",fontSize:14,boxSizing:"border-box",outline:"none",fontFamily:"inherit"}}/>
  </div>;
}
function Btn({children,onClick,color=C.red,disabled,full,outline,small}){
  return <button onClick={onClick} disabled={disabled} style={{background:outline?"transparent":(disabled?"#ccc":color),color:outline?color:C.white,border:outline?`2px solid ${color}`:"none",borderRadius:10,padding:small?"7px 14px":"11px 22px",fontSize:small?13:14,fontWeight:700,cursor:disabled?"not-allowed":"pointer",width:full?"100%":"auto",fontFamily:"inherit",transition:"all 0.18s"}}>{children}</button>;
}
function Logo({size=40}){
  return <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill="white" stroke="#222" strokeWidth="2.5"/>
    <path d="M50 58 Q32 30 28 12" stroke="#D32F2F" strokeWidth="7" strokeLinecap="round" fill="none"/>
    <path d="M50 58 Q40 26 42 10" stroke="#2E7D32" strokeWidth="7" strokeLinecap="round" fill="none"/>
    <path d="M50 58 Q58 26 58 10" stroke="#F9A825" strokeWidth="7" strokeLinecap="round" fill="none"/>
    <path d="M50 58 Q68 30 72 12" stroke="#1565C0" strokeWidth="7" strokeLinecap="round" fill="none"/>
    <path d="M50 58 Q38 56 22 62 L22 82 Q38 76 50 78 Z" fill="#8B5E3C"/>
    <path d="M50 58 Q62 56 78 62 L78 82 Q62 76 50 78 Z" fill="#A0522D"/>
    <line x1="50" y1="58" x2="50" y2="78" stroke="#6B3F1E" strokeWidth="1.5"/>
    <path d="M44 82 L44 94 L50 89 L56 94 L56 82 Z" fill="none" stroke="#555" strokeWidth="1.8" strokeLinejoin="round"/>
  </svg>;
}
function ProgressBar({step}){
  const labels=["Basics","Interests","Goals","Education","Background"];
  return <div style={{marginBottom:22}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
      {labels.map((l,i)=><div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",flex:1}}>
        <div style={{width:24,height:24,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:i<=step?C.red:"#e0e0e0",color:i<=step?C.white:"#aaa",fontWeight:700,fontSize:11,marginBottom:3}}>{i+1}</div>
        <span style={{fontSize:9,color:i<=step?C.red:"#bbb",fontWeight:i===step?700:400,textAlign:"center"}}>{l}</span>
      </div>)}
    </div>
    <div style={{height:4,background:"#e0e0e0",borderRadius:4}}>
      <div style={{height:4,background:`linear-gradient(90deg,${C.red},${C.yellow},${C.green},${C.blue})`,borderRadius:4,width:`${(step/4)*100}%`,transition:"width 0.4s"}}/>
    </div>
  </div>;
}

// ── LOADING ───────────────────────────────────────────────────────────────────
function LoadingScreen({stage}){
  const [qIdx,setQIdx]=useState(Math.floor(Math.random()*QUOTES.length));
  const [vis,setVis]=useState(true);
  useEffect(()=>{
    const iv=setInterval(()=>{setVis(false);setTimeout(()=>{setQIdx(q=>(q+1)%QUOTES.length);setVis(true);},500);},4000);
    return()=>clearInterval(iv);
  },[]);
  const stages=[{icon:"📚",text:"Scanning 45+ Canadian scholarships…",color:C.blue},{icon:"🌐",text:"Searching the web for more matches…",color:C.green},{icon:"🤖",text:"AI writing your personal match reasons…",color:C.yellow},{icon:"🎯",text:"Ranking your best matches…",color:C.red}];
  const q=QUOTES[qIdx];
  return <div style={{minHeight:"100vh",background:`linear-gradient(160deg,#0d1b4b 0%,#1a3a6b 40%,#0a4a3a 100%)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:"'Segoe UI',sans-serif",gap:28,padding:24}}>
    <Logo size={64}/>
    <h2 style={{color:C.white,margin:0,fontSize:22}}>Finding Your Scholarships…</h2>
    <div style={{display:"flex",flexDirection:"column",gap:10,width:"100%",maxWidth:360}}>
      {stages.map((s,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",borderRadius:12,background:i===stage?s.color+"33":i<stage?"#ffffff0a":"#ffffff05",border:`1.5px solid ${i===stage?s.color:i<stage?"#ffffff22":"#ffffff08"}`,transition:"all 0.4s"}}>
        <span style={{fontSize:20,filter:i>stage?"grayscale(1) opacity(0.3)":"none"}}>{s.icon}</span>
        <span style={{fontSize:13,fontWeight:i===stage?700:400,color:i===stage?s.color:i<stage?"#aaa":"#444"}}>{s.text}</span>
        {i<stage&&<span style={{marginLeft:"auto",color:C.green}}>✓</span>}
        {i===stage&&<div style={{marginLeft:"auto",width:16,height:16,borderRadius:"50%",border:`2px solid ${s.color}`,borderTopColor:"transparent",animation:"spin 0.8s linear infinite"}}/>}
      </div>)}
    </div>
    <div style={{maxWidth:420,textAlign:"center",opacity:vis?1:0,transition:"opacity 0.5s",padding:"22px 26px",background:C.white,borderRadius:18,boxShadow:`0 4px 24px ${C.blue}44`,border:`2px solid ${C.blue}22`}}>
      <div style={{fontSize:28,color:C.blue,lineHeight:1}}>"</div>
      <p style={{color:C.blue,fontSize:15,fontStyle:"italic",lineHeight:1.7,margin:"6px 0 10px",fontWeight:500}}>{q.text}</p>
      <p style={{color:C.red,fontSize:13,fontWeight:700,margin:0}}>— {q.author}</p>
    </div>
    <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
  </div>;
}

// ── CAREER CONFIRM ────────────────────────────────────────────────────────────
function CareerConfirm({goal,onConfirm,onEdit}){
  const [overview,setOverview]=useState("");
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    (async()=>{
      try{
        const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:200,messages:[{role:"user",content:`Give a 2-sentence overview of what a "${goal}" does in Canada, education required, and typical salary. Plain text only.`}]})});
        const data=await res.json();
        setOverview(data.content?.map(b=>b.text||"").join("")||"");
      }catch(e){setOverview(`A career as a ${goal} is a great choice! Look into Canadian universities offering relevant programs.`);}
      setLoading(false);
    })();
  },[]);
  return <div style={{position:"fixed",inset:0,background:"#00000077",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2000,padding:16}}>
    <div style={{background:C.white,borderRadius:20,padding:28,maxWidth:460,width:"100%",boxShadow:"0 12px 48px #0004"}}>
      <div style={{fontSize:32,textAlign:"center",marginBottom:8}}>🎯</div>
      <h3 style={{color:C.blue,textAlign:"center",margin:"0 0 4px"}}>Is this your dream career?</h3>
      <p style={{color:C.muted,textAlign:"center",fontSize:13,marginBottom:16}}>You entered: <strong style={{color:C.text}}>{goal}</strong></p>
      <div style={{background:C.blueL,borderRadius:12,padding:"14px 16px",marginBottom:20,minHeight:60,border:`1.5px solid ${C.blue}22`}}>
        {loading?<div style={{color:C.muted,fontSize:13,textAlign:"center"}}>Loading career overview…</div>
        :<p style={{fontSize:13,color:C.text,lineHeight:1.7,margin:0}}>{overview}</p>}
      </div>
      <div style={{display:"flex",gap:10}}>
        <Btn full outline color={C.red} onClick={onEdit}>← Edit Career</Btn>
        <Btn full color={C.blue} onClick={onConfirm} disabled={loading}>Yes, find my scholarships →</Btn>
      </div>
    </div>
  </div>;
}

// ── CAREER SUGGESTIONS MODAL ──────────────────────────────────────────────────
function CareerSuggestModal({form,onClose}){
  const [careers,setCareers]=useState([]);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    (async()=>{
      try{
        const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:500,messages:[{role:"user",content:`Based on this student's profile, suggest 3 alternate career paths they might not have considered:
Interests: ${form.interests.join(", ")}, Passions: ${[...form.passions,...(form.customPassions||[])].join(", ")}, Goal: ${form.goal}, Grade: ${form.grade}, Province: ${form.province}.
Return JSON array of 3 objects with: title (career name), why (1 sentence why it fits them), salary (Canadian average), education (required).
JSON only.`}]})});
        const data=await res.json();
        const text=data.content?.map(b=>b.text||"").join("")||"[]";
        setCareers(JSON.parse(text.replace(/```json|```/g,"").trim()));
      }catch(e){setCareers([]);}
      setLoading(false);
    })();
  },[]);
  const colors=[C.blue,C.green,C.red];
  return <div style={{position:"fixed",inset:0,background:"#00000077",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2000,padding:16}}>
    <div style={{background:C.white,borderRadius:20,padding:28,maxWidth:500,width:"100%",boxShadow:"0 12px 48px #0004",maxHeight:"90vh",overflowY:"auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <h3 style={{color:C.blue,margin:0}}>🌟 Alternate Career Paths</h3>
        <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:C.muted}}>×</button>
      </div>
      <p style={{color:C.muted,fontSize:13,marginBottom:20}}>Based on your interests and passions, you might also thrive in:</p>
      {loading?<div style={{textAlign:"center",padding:30,color:C.muted}}>AI is generating your personalized career suggestions…</div>
      :careers.length===0?<div style={{textAlign:"center",padding:30,color:C.muted}}>Unable to generate suggestions right now.</div>
      :careers.map((c,i)=><div key={i} style={{background:colors[i]+"10",border:`1.5px solid ${colors[i]}33`,borderRadius:14,padding:"16px 18px",marginBottom:12}}>
        <div style={{fontWeight:800,fontSize:15,color:colors[i],marginBottom:6}}>{c.title}</div>
        <p style={{fontSize:13,color:C.text,margin:"0 0 8px",lineHeight:1.6}}>{c.why}</p>
        <div style={{display:"flex",gap:12,fontSize:12,color:C.muted,flexWrap:"wrap"}}>
          <span>💰 {c.salary}</span><span>🎓 {c.education}</span>
        </div>
      </div>)}
      <Btn full outline color={C.blue} onClick={onClose}>Close</Btn>
    </div>
  </div>;
}

// ── PLANNING PAGE (full page) ─────────────────────────────────────────────────
function PlanningPage({results,form,onBack}){
  const [scholarshipName,setScholarshipName]=useState("");
  const [customScholarship,setCustomScholarship]=useState("");
  const [topic,setTopic]=useState("");
  const [plan,setPlan]=useState("");
  const [loading,setLoading]=useState(false);
  const [history,setHistory]=useState([]);
  const finalScholarship=scholarshipName==="other"?customScholarship:scholarshipName;
  const generate=async()=>{
    if(!finalScholarship.trim()||!topic.trim())return;
    setLoading(true);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:800,system:`You are a scholarship application planning coach for Canadian students. Student profile: Interests: ${form?.interests?.join(", ")}, Goal: ${form?.goal}, Grade: ${form?.grade}, Province: ${form?.province}, Passions: ${[...(form?.passions||[]),...(form?.customPassions||[])].join(", ")}. NEVER write a full essay. If asked to write a full essay, politely decline and offer a detailed outline instead. Only provide outlines, planning frameworks, key points, and structural advice.`,messages:[{role:"user",content:`Scholarship: ${finalScholarship}\nHelp me plan: ${topic}`}]})});
      const data=await res.json();
      const response=data.content?.map(b=>b.text||"").join("")||"";
      setPlan(response);
      setHistory(h=>[{scholarship:finalScholarship,topic,response},...h]);
    }catch(e){setPlan("Sorry, something went wrong. Please try again.");}
    setLoading(false);
  };
  return <div style={{minHeight:"100vh",background:`linear-gradient(135deg,#f5f3ff 0%,#fff 50%,${C.blueL} 100%)`,fontFamily:"'Segoe UI',sans-serif",padding:"0 0 60px"}}>
    {/* Header */}
    <div style={{background:`linear-gradient(135deg,${C.red},${C.yellow})`,padding:"20px 28px",display:"flex",alignItems:"center",gap:16}}>
      <button onClick={onBack} style={{background:"rgba(255,255,255,0.25)",border:"none",borderRadius:9,padding:"8px 14px",cursor:"pointer",color:C.white,fontWeight:700,fontSize:14}}>← Back</button>
      <div>
        <h2 style={{color:C.white,margin:0,fontSize:20,fontWeight:900}}>✍️ Application Planning Assistant</h2>
        <p style={{color:"rgba(255,255,255,0.8)",margin:"2px 0 0",fontSize:13}}>Get help planning your essays and applications — we guide you, you write it!</p>
      </div>
    </div>
    <div style={{maxWidth:760,margin:"0 auto",padding:"28px 16px"}}>
      {/* Important note */}
      <div style={{background:C.yellowL,borderRadius:14,padding:"14px 18px",marginBottom:24,border:`1.5px solid ${C.yellow}44`,fontSize:13,color:"#555"}}>
        💡 <strong>Note:</strong> This assistant helps you <em>plan and outline</em> your applications. Writing the essay yourself is what makes it authentic and personal — that's what wins scholarships!
      </div>
      {/* Step 1: Pick scholarship */}
      <div style={{background:C.white,borderRadius:16,padding:"20px 22px",marginBottom:16,boxShadow:"0 2px 12px #0001",border:`1.5px solid ${C.blue}22`}}>
        <div style={{fontWeight:800,color:C.blue,fontSize:15,marginBottom:12}}>Step 1 — Which scholarship do you need help with?</div>
        <select value={scholarshipName} onChange={e=>setScholarshipName(e.target.value)} style={{width:"100%",padding:"11px 14px",borderRadius:10,border:"1.5px solid #ddd",fontSize:14,fontFamily:"inherit",background:C.white,outline:"none",marginBottom:10}}>
          <option value="">Select from your matches…</option>
          {(results||[]).slice(0,30).map((r,i)=><option key={i} value={r.name}>{r.name} — {r.amount}</option>)}
          <option value="other">Other / Not in my list</option>
        </select>
        {scholarshipName==="other"&&<input value={customScholarship} onChange={e=>setCustomScholarship(e.target.value)} placeholder="Type the scholarship name…" style={{width:"100%",padding:"11px 14px",borderRadius:10,border:"1.5px solid #ddd",fontSize:14,boxSizing:"border-box",fontFamily:"inherit",outline:"none"}}/>}
      </div>
      {/* Step 2: What help */}
      <div style={{background:C.white,borderRadius:16,padding:"20px 22px",marginBottom:16,boxShadow:"0 2px 12px #0001",border:`1.5px solid ${C.green}22`}}>
        <div style={{fontWeight:800,color:C.green,fontSize:15,marginBottom:12}}>Step 2 — What do you need help planning?</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:12}}>
          {["Outline my personal statement","Key points to include in my essay","How to structure my application","What makes a strong applicant","How to show leadership in my essay","How to address financial need"].map(s=><button key={s} onClick={()=>setTopic(s)} style={{padding:"7px 14px",borderRadius:20,border:`1.5px solid ${topic===s?C.green:"#ddd"}`,background:topic===s?C.greenL:C.white,color:topic===s?C.green:C.muted,cursor:"pointer",fontSize:12,fontWeight:topic===s?700:400}}>{s}</button>)}
        </div>
        <textarea value={topic} onChange={e=>setTopic(e.target.value)} placeholder="Or type your own question…" style={{width:"100%",height:80,padding:"10px 13px",borderRadius:10,border:"1.5px solid #ddd",fontSize:13,boxSizing:"border-box",fontFamily:"inherit",resize:"vertical",outline:"none"}}/>
      </div>
      {/* Generate */}
      <button onClick={generate} disabled={loading||!finalScholarship.trim()||!topic.trim()} style={{width:"100%",background:loading||!finalScholarship.trim()||!topic.trim()?`#ccc`:`linear-gradient(135deg,${C.red},${C.yellow})`,color:C.white,border:"none",borderRadius:12,padding:"14px 0",fontSize:15,fontWeight:800,cursor:loading||!finalScholarship.trim()||!topic.trim()?"not-allowed":"pointer",marginBottom:20}}>
        {loading?"Planning…":"Get Planning Help ✍️"}
      </button>
      {/* Response */}
      {plan&&<div style={{background:C.white,borderRadius:16,padding:"20px 22px",marginBottom:20,boxShadow:"0 2px 12px #0001",border:`1.5px solid ${C.red}22`}}>
        <div style={{fontWeight:800,color:C.red,fontSize:14,marginBottom:10}}>📋 Your Planning Guide for {finalScholarship}</div>
        <div style={{fontSize:13,lineHeight:1.8,color:C.text,whiteSpace:"pre-wrap"}}>{plan}</div>
        <button onClick={()=>navigator.clipboard.writeText(plan)} style={{marginTop:14,background:"none",border:`1.5px solid ${C.muted}`,borderRadius:9,padding:"7px 16px",cursor:"pointer",fontSize:12,color:C.muted,fontWeight:600}}>📋 Copy Plan</button>
      </div>}
      {/* History */}
      {history.length>1&&<div>
        <div style={{fontWeight:700,color:C.muted,fontSize:13,marginBottom:10}}>Previous Planning Sessions</div>
        {history.slice(1).map((h,i)=><div key={i} style={{background:"#f9f9f9",borderRadius:12,padding:"12px 16px",marginBottom:10,border:"1px solid #eee",cursor:"pointer"}} onClick={()=>{setPlan(h.response);setScholarshipName(h.scholarship);setTopic(h.topic);}}>
          <div style={{fontWeight:700,fontSize:13,color:C.text}}>{h.scholarship}</div>
          <div style={{fontSize:12,color:C.muted}}>{h.topic}</div>
        </div>)}
      </div>}
    </div>
  </div>;
}

// ── SCHOLARSHIP CARD ──────────────────────────────────────────────────────────
function ScholarCard({opp,rank,onSave,saved,applied,onToggleApplied}){
  const [open,setOpen]=useState(false);
  const [checkedItems,setCheckedItems]=useState([]);
  const medal=rank===0?"🥇":rank===1?"🥈":rank===2?"🥉":null;
  const matchPct=Math.min(99,Math.max(10,Math.round((opp.score/22)*100)));
  const barCol=matchPct>=75?C.green:matchPct>=50?C.yellow:C.red;
  const checklist=opp.checklist||["Write personal statement","Gather references","Prepare transcripts","Submit application"];
  const doneCount=checkedItems.length;
  return <div style={{border:`2px solid ${rank<3?C.yellow+"66":"#e8e8e8"}`,borderRadius:16,padding:18,marginBottom:14,background:applied?"#f0fff4":C.white,boxShadow:rank===0?"0 4px 20px #F9A82522":"0 2px 8px #0001"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
      <div style={{flex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6,flexWrap:"wrap"}}>
          {medal&&<span style={{fontSize:17}}>{medal}</span>}
          <span style={{fontSize:11,fontWeight:700,background:C.blueL,color:C.blue,padding:"3px 9px",borderRadius:20}}>🎓 Scholarship</span>
          {opp.verified&&<span style={{fontSize:11,fontWeight:700,background:C.greenL,color:C.green,padding:"3px 9px",borderRadius:20}}>✓ Verified</span>}
          {opp.source==="ai"&&<span style={{fontSize:11,fontWeight:700,background:"#e8f5e9",color:C.green,padding:"3px 9px",borderRadius:20}}>🌐 Web Found</span>}
          {applied&&<span style={{fontSize:11,fontWeight:700,background:C.greenL,color:C.green,padding:"3px 9px",borderRadius:20}}>✅ Applied</span>}
        </div>
        <div style={{fontWeight:700,fontSize:15,color:C.text}}>{opp.name}</div>
        <div style={{fontSize:13,color:C.muted,marginTop:2}}>{opp.amount}</div>
        <div style={{marginTop:8}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:C.muted,marginBottom:3}}>
            <span>Match Score</span><span style={{color:barCol,fontWeight:700}}>{matchPct}%</span>
          </div>
          <div style={{height:6,background:"#eee",borderRadius:4}}>
            <div style={{height:6,background:barCol,borderRadius:4,width:`${matchPct}%`,transition:"width 0.6s"}}/>
          </div>
        </div>
        {doneCount>0&&<div style={{marginTop:5,fontSize:11,color:C.green}}>✓ {doneCount}/{checklist.length} checklist items done</div>}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginLeft:10}}>
        <Btn small color={C.blue} onClick={()=>setOpen(!open)}>{open?"Less":"Details"}</Btn>
        <button onClick={onSave} style={{background:"none",border:`1.5px solid ${C.yellow}`,borderRadius:8,padding:"5px 10px",cursor:"pointer",fontSize:12,color:C.yellow,fontWeight:700}}>{saved?"★ Saved":"☆ Save"}</button>
        <button onClick={onToggleApplied} style={{background:"none",border:`1.5px solid ${applied?C.green:C.muted}`,borderRadius:8,padding:"5px 10px",cursor:"pointer",fontSize:12,color:applied?C.green:C.muted,fontWeight:700}}>{applied?"✅ Applied":"Mark Applied"}</button>
      </div>
    </div>
    {open&&<div style={{marginTop:14,borderTop:"1px solid #f0f0f0",paddingTop:14}}>
      {opp.org&&<div style={{background:"#f8f8f8",borderRadius:10,padding:"9px 13px",fontSize:13,marginBottom:10,color:"#555",border:"1px solid #eee"}}>
        <strong style={{color:C.text}}>🏢 About:</strong> {opp.org}
      </div>}
      <p style={{fontSize:13,color:"#444",margin:"0 0 12px",lineHeight:1.6}}>{opp.description}</p>
      <div style={{background:C.yellowL,borderRadius:10,padding:"10px 14px",fontSize:13,marginBottom:10,border:`1px solid ${C.yellow}44`}}>
        <strong style={{color:C.yellow}}>✨ Why this matches you:</strong>
        <p style={{margin:"5px 0 0",color:C.text,lineHeight:1.6}}>{opp.reason}</p>
      </div>
      <div style={{background:"#f9f9f9",borderRadius:10,padding:"12px 14px",marginBottom:10,border:"1px solid #eee"}}>
        <strong style={{color:C.text,fontSize:13}}>📋 Application Checklist</strong>
        <div style={{marginTop:8,display:"flex",flexDirection:"column",gap:6}}>
          {checklist.map((item,i)=><label key={i} style={{display:"flex",alignItems:"center",gap:8,fontSize:13,cursor:"pointer",color:checkedItems.includes(i)?C.green:C.text}}>
            <input type="checkbox" checked={checkedItems.includes(i)} onChange={()=>setCheckedItems(p=>p.includes(i)?p.filter(x=>x!==i):[...p,i])} style={{accentColor:C.green}}/>
            <span style={{textDecoration:checkedItems.includes(i)?"line-through":"none"}}>{item}</span>
          </label>)}
        </div>
        <div style={{marginTop:8,height:4,background:"#eee",borderRadius:4}}>
          <div style={{height:4,background:C.green,borderRadius:4,width:`${(doneCount/checklist.length)*100}%`,transition:"width 0.3s"}}/>
        </div>
      </div>
      {opp.howToApply&&<div style={{background:C.greenL,borderRadius:10,padding:"10px 14px",fontSize:13,marginBottom:10,border:`1px solid ${C.green}44`}}>
        <strong style={{color:C.green}}>📋 How to Apply:</strong>
        <p style={{margin:"5px 0 0",color:C.text,lineHeight:1.6}}>{opp.howToApply}</p>
      </div>}
      {opp.requirements&&<div style={{background:C.blueL,borderRadius:10,padding:"10px 14px",fontSize:13,marginBottom:10,border:`1px solid ${C.blue}44`}}>
        <strong style={{color:C.blue}}>✅ What You Need:</strong>
        <p style={{margin:"5px 0 0",color:C.text,lineHeight:1.6}}>{opp.requirements}</p>
      </div>}
      {opp.deadline&&<div style={{fontSize:12,color:C.muted,marginBottom:10}}>📅 Deadline: <strong>{opp.deadline}</strong></div>}
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        {opp.link&&<a href={opp.link} target="_blank" rel="noreferrer" style={{display:"inline-block",background:C.red,color:C.white,padding:"9px 20px",borderRadius:9,textDecoration:"none",fontSize:13,fontWeight:700}}>Apply Now →</a>}
        <button onClick={()=>{const t=`ScholarMatch Result:\n${opp.name} — ${opp.amount}\n${opp.reason}\nApply: ${opp.link}`;navigator.clipboard.writeText(t);alert("Copied! Share with your parent or counsellor.");}} style={{background:"none",border:`1.5px solid ${C.blue}`,borderRadius:9,padding:"9px 16px",cursor:"pointer",fontSize:13,color:C.blue,fontWeight:700}}>🔗 Share</button>
      </div>
    </div>}
  </div>;
}

// ── SIDE PANEL ────────────────────────────────────────────────────────────────
function SidePanel({results,saved,form,applied}){
  const tips=["Start with your top 3 — apply before deadlines!","Tailor each essay to the scholarship's specific values.","Ask for reference letters early — teachers get busy!","Apply to as many as you qualify for.","Keep transcripts and references ready to go."];
  const [tipIdx]=useState(Math.floor(Math.random()*tips.length));
  const q=QUOTES[Math.floor(Math.random()*QUOTES.length)];
  return <div style={{display:"flex",flexDirection:"column",gap:14,width:210}}>
    <div style={{background:C.white,borderRadius:16,padding:16,boxShadow:"0 2px 12px #0001",border:`1.5px solid ${C.blueL}`}}>
      <div style={{fontWeight:800,fontSize:13,color:C.blue,marginBottom:12}}>📊 Your Results</div>
      {[[`${results?.length||0}`,"Found",C.blue],[`${saved?.length||0}`,"Saved",C.yellow],[`${applied?.length||0}`,"Applied",C.green],[`${results?.filter(r=>r.source==="ai").length||0}`,"Web Found",C.red]].map(([v,l,c])=>
        <div key={l} style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
          <span style={{fontSize:12,color:C.muted}}>{l}</span>
          <span style={{fontWeight:800,fontSize:13,color:c}}>{v}</span>
        </div>)}
      {saved?.length>0&&<div style={{marginTop:8}}>
        <div style={{fontSize:11,color:C.muted,marginBottom:4}}>Applied to {applied?.length||0} of {saved.length} saved</div>
        <div style={{height:6,background:"#eee",borderRadius:4}}>
          <div style={{height:6,background:C.green,borderRadius:4,width:`${((applied?.length||0)/saved.length)*100}%`,transition:"width 0.4s"}}/>
        </div>
      </div>}
    </div>
    <div style={{background:C.yellowL,borderRadius:16,padding:16,border:`1.5px solid ${C.yellow}44`}}>
      <div style={{fontWeight:800,fontSize:13,color:C.yellow,marginBottom:8}}>💡 Pro Tip</div>
      <p style={{fontSize:12,color:"#555",lineHeight:1.65,margin:0}}>{tips[tipIdx]}</p>
    </div>
    <div style={{background:C.white,borderRadius:16,padding:16,border:`2px solid ${C.blue}22`,boxShadow:`0 2px 12px ${C.blue}18`}}>
      <div style={{fontSize:20,color:C.blue,lineHeight:1}}>"</div>
      <p style={{fontSize:12,color:C.blue,fontStyle:"italic",lineHeight:1.65,margin:"4px 0 8px",fontWeight:500}}>{q.text}</p>
      <p style={{fontSize:11,color:C.red,fontWeight:700,margin:0}}>— {q.author}</p>
    </div>
    {form&&<div style={{background:C.redL,borderRadius:16,padding:16,border:`1.5px solid ${C.red}22`}}>
      <div style={{fontWeight:800,fontSize:13,color:C.red,marginBottom:10}}>👤 Profile</div>
      {[[form.grade,"📚"],[form.gpa,"📊"],[form.province,"📍"],[form.goal,"🎯"]].filter(([v])=>v).map(([v,e])=>
        <div key={v} style={{fontSize:12,color:C.text,marginBottom:5}}>{e} {v}</div>)}
    </div>}
  </div>;
}

// ── CALENDAR WITH NOTES ───────────────────────────────────────────────────────
function CalendarPage({results,saved}){
  const [notes,setNotes]=useState({});
  const [noteInput,setNoteInput]=useState("");
  const savedS=(results||[]).filter(r=>saved.includes(r.name));
  const mMap={jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,dec:11,january:0,february:1,march:2,april:3,june:5,july:6,august:7,september:8,october:9,november:10,december:11,rolling:-1};
  const withM=savedS.map(s=>{const dl=(s.deadline||"").toLowerCase().split(" ")[0];return{...s,month:mMap[dl]??-1};}).filter(s=>s.month>=0).sort((a,b)=>a.month-b.month);
  const addNote=()=>{if(!noteInput.trim())return;setNotes(n=>({...n,general:[...(n.general||[]),noteInput.trim()]}));setNoteInput("");};
  const deleteNote=i=>setNotes(n=>({...n,general:(n.general||[]).filter((_,j)=>j!==i)}));
  if(!savedS.length) return <div>
    <h3 style={{color:C.blue,marginBottom:8}}>📅 Deadline Calendar</h3>
    <div style={{textAlign:"center",padding:40,color:C.muted,background:"#f9f9f9",borderRadius:12}}>Save some scholarships first to see their deadlines here!</div>
    <div style={{marginTop:20}}><div style={{fontWeight:700,color:C.text,marginBottom:10}}>📝 Your Notes</div>
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        <input value={noteInput} onChange={e=>setNoteInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addNote()} placeholder="Write a note…" style={{flex:1,padding:"9px 12px",borderRadius:9,border:"1.5px solid #ddd",fontSize:13,outline:"none",fontFamily:"inherit"}}/>
        <button onClick={addNote} style={{background:C.blue,color:C.white,border:"none",borderRadius:9,padding:"9px 16px",cursor:"pointer",fontWeight:700,fontSize:13}}>Add</button>
      </div>
      {(notes.general||[]).map((note,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:C.yellowL,borderRadius:9,padding:"8px 12px",marginBottom:6,fontSize:13}}>
        <span>{note}</span><button onClick={()=>deleteNote(i)} style={{background:"none",border:"none",color:C.red,cursor:"pointer",fontWeight:700,fontSize:15}}>×</button>
      </div>)}
    </div>
  </div>;
  return <div>
    <h3 style={{color:C.blue,marginBottom:4}}>📅 Deadline Calendar</h3>
    <p style={{color:C.muted,fontSize:13,marginBottom:16}}>Deadlines for your saved scholarships.</p>
    <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:24}}>
      {withM.map((s,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:14,background:C.white,borderRadius:12,padding:"12px 16px",border:`1.5px solid ${C.blue}22`,boxShadow:"0 2px 8px #0001"}}>
        <div style={{background:C.blue,color:C.white,borderRadius:10,padding:"8px 12px",textAlign:"center",minWidth:50}}>
          <div style={{fontSize:11,fontWeight:700}}>{MONTHS[s.month]}</div>
        </div>
        <div style={{flex:1}}>
          <div style={{fontWeight:700,fontSize:14}}>{s.name}</div>
          <div style={{fontSize:12,color:C.muted}}>Deadline: {s.deadline} · {s.amount}</div>
        </div>
        <a href={s.link} target="_blank" rel="noreferrer" style={{background:C.red,color:C.white,padding:"6px 14px",borderRadius:8,textDecoration:"none",fontSize:12,fontWeight:700}}>Apply</a>
      </div>)}
      {savedS.filter(s=>{const dl=(s.deadline||"").toLowerCase();return dl.includes("rolling")||mMap[dl.split(" ")[0]]===undefined;}).map((s,i)=>
        <div key={i} style={{display:"flex",alignItems:"center",gap:14,background:C.white,borderRadius:12,padding:"12px 16px",border:`1.5px solid ${C.yellow}44`}}>
          <div style={{background:C.yellow,color:C.white,borderRadius:10,padding:"8px 12px",textAlign:"center",minWidth:50}}>
            <div style={{fontSize:11,fontWeight:700}}>Any</div>
          </div>
          <div style={{flex:1}}>
            <div style={{fontWeight:700,fontSize:14}}>{s.name}</div>
            <div style={{fontSize:12,color:C.muted}}>Rolling deadline · {s.amount}</div>
          </div>
          <a href={s.link} target="_blank" rel="noreferrer" style={{background:C.red,color:C.white,padding:"6px 14px",borderRadius:8,textDecoration:"none",fontSize:12,fontWeight:700}}>Apply</a>
        </div>)}
    </div>
    {/* Notes section */}
    <div style={{background:"#f9f9f9",borderRadius:14,padding:"16px 18px",border:"1px solid #eee"}}>
      <div style={{fontWeight:700,color:C.text,marginBottom:12,fontSize:14}}>📝 Your Notes</div>
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        <input value={noteInput} onChange={e=>setNoteInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addNote()} placeholder="Write a note about any scholarship or deadline…" style={{flex:1,padding:"9px 12px",borderRadius:9,border:"1.5px solid #ddd",fontSize:13,outline:"none",fontFamily:"inherit"}}/>
        <button onClick={addNote} style={{background:C.blue,color:C.white,border:"none",borderRadius:9,padding:"9px 16px",cursor:"pointer",fontWeight:700,fontSize:13}}>Add</button>
      </div>
      {(notes.general||[]).length===0&&<p style={{fontSize:13,color:C.muted,margin:0}}>No notes yet. Add reminders, essay ideas, or anything you want to remember!</p>}
      {(notes.general||[]).map((note,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:C.yellowL,borderRadius:9,padding:"9px 13px",marginBottom:6,fontSize:13,border:`1px solid ${C.yellow}33`}}>
        <span>{note}</span><button onClick={()=>deleteNote(i)} style={{background:"none",border:"none",color:C.red,cursor:"pointer",fontWeight:700,fontSize:16}}>×</button>
      </div>)}
    </div>
  </div>;
}

// ── CHATBOX ───────────────────────────────────────────────────────────────────
function ChatBox({profile}){
  const [open,setOpen]=useState(false);
  const [msgs,setMsgs]=useState([]);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const bottomRef=useRef(null);
  useEffect(()=>{
    if(open&&msgs.length===0&&profile)setMsgs([{role:"assistant",text:`Hi ${profile.name?.split(" ")[0]||"there"}! 👋 I have your full profile ready. Ask me anything about your scholarships or applications!`}]);
  },[open]);
  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"});},[msgs]);
  const send=async()=>{
    if(!input.trim()||loading)return;
    const userMsg=input.trim();setInput("");setLoading(true);
    setMsgs(m=>[...m,{role:"user",text:userMsg}]);
    try{
      const history=msgs.map(m=>({role:m.role==="assistant"?"assistant":"user",content:m.text}));
      const sys=`You are a helpful Canadian scholarship advisor. Student: Name: ${profile?.name}, Grade: ${profile?.grade}, Average: ${profile?.gpa}, Province: ${profile?.province}, Interests: ${profile?.interests?.join(", ")}, Passions: ${[...(profile?.passions||[]),...(profile?.customPassions||[])].join(", ")}, Goal: ${profile?.goal}, Financial need: ${profile?.financialNeed}, First gen: ${profile?.firstGen}. Never ask for info already in profile. If asked to write a full essay, decline and offer to help plan instead.`;
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:sys,messages:[...history,{role:"user",content:userMsg}]})});
      const data=await res.json();
      setMsgs(m=>[...m,{role:"assistant",text:data.content?.map(b=>b.text||"").join("")||"Sorry, try again."}]);
    }catch{setMsgs(m=>[...m,{role:"assistant",text:"Something went wrong. Please try again."}]);}
    setLoading(false);
  };
  return <>
    <button onClick={()=>setOpen(!open)} style={{position:"fixed",bottom:24,right:24,width:58,height:58,borderRadius:"50%",background:`linear-gradient(135deg,${C.blue},${C.red})`,border:"none",cursor:"pointer",fontSize:26,boxShadow:"0 4px 16px #0003",zIndex:1000}}>💬</button>
    {open&&<div style={{position:"fixed",bottom:94,right:24,width:330,height:430,background:C.white,borderRadius:18,boxShadow:"0 8px 32px #0003",display:"flex",flexDirection:"column",zIndex:1000,overflow:"hidden",border:`2px solid ${C.blue}44`}}>
      <div style={{background:`linear-gradient(135deg,${C.blue},${C.red})`,padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}><Logo size={22}/><span style={{color:C.white,fontWeight:700,fontSize:14}}>ScholarMatch AI</span></div>
        <button onClick={()=>setOpen(false)} style={{background:"none",border:"none",color:C.white,cursor:"pointer",fontSize:20}}>×</button>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:12,display:"flex",flexDirection:"column",gap:8}}>
        {msgs.map((m,i)=><div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
          <div style={{maxWidth:"82%",padding:"9px 13px",borderRadius:13,background:m.role==="user"?C.blue:C.blueL,color:m.role==="user"?C.white:C.text,fontSize:13,lineHeight:1.55,whiteSpace:"pre-wrap"}}>{m.text}</div>
        </div>)}
        {loading&&<div style={{display:"flex"}}><div style={{background:C.blueL,padding:"9px 13px",borderRadius:13,fontSize:13,color:C.muted}}>Typing…</div></div>}
        <div ref={bottomRef}/>
      </div>
      <div style={{padding:"10px 12px",borderTop:"1px solid #eee",display:"flex",gap:8}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask about scholarships…" style={{flex:1,padding:"9px 12px",borderRadius:9,border:"1.5px solid #ddd",fontSize:13,outline:"none",fontFamily:"inherit"}}/>
        <button onClick={send} disabled={loading||!input.trim()} style={{background:C.blue,color:C.white,border:"none",borderRadius:9,padding:"9px 14px",cursor:"pointer",fontWeight:700,fontSize:13}}>→</button>
      </div>
    </div>}
  </>;
}

// ── MOUNTAIN HOME PAGE ────────────────────────────────────────────────────────
function HomePage({onSignup,onLogin}){
  const [scrollY,setScrollY]=useState(0);
  useEffect(()=>{const h=()=>setScrollY(window.scrollY);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);},[]);
  const Stars=()=><>{Array.from({length:60},(_,i)=><div key={i} style={{position:"absolute",width:i%5===0?3:i%3===0?2:1.5,height:i%5===0?3:i%3===0?2:1.5,borderRadius:"50%",background:"white",opacity:0.4+Math.random()*0.6,top:`${Math.random()*55}%`,left:`${Math.random()*100}%`,animation:`twinkle ${2+Math.random()*3}s ease-in-out infinite`,animationDelay:`${Math.random()*3}s`}}/>)}</>;
  return <div style={{fontFamily:"'Segoe UI',sans-serif",background:"#0a1628",minHeight:"100vh",overflowX:"hidden"}}>
    <style>{`
      @keyframes twinkle{0%,100%{opacity:0.3}50%{opacity:1}}
      @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
    `}</style>
    {/* Sticky nav */}
    <div style={{position:"fixed",top:0,left:0,right:0,zIndex:100,display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 32px",background:scrollY>50?"#0a162899":"transparent",backdropFilter:scrollY>50?"blur(12px)":"none",transition:"all 0.3s"}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}><Logo size={34}/><span style={{fontWeight:900,color:C.white,fontSize:18,letterSpacing:"-0.5px"}}>ScholarMatch</span></div>
      <div style={{display:"flex",gap:10}}>
        <button onClick={onLogin} style={{background:"transparent",border:`1.5px solid rgba(255,255,255,0.4)`,borderRadius:10,padding:"8px 20px",fontWeight:600,color:C.white,cursor:"pointer",fontSize:14}}>Log In</button>
        <button onClick={onSignup} style={{background:`linear-gradient(135deg,${C.red},${C.yellow})`,border:"none",borderRadius:10,padding:"8px 22px",fontWeight:700,color:C.white,cursor:"pointer",fontSize:14,boxShadow:`0 4px 16px ${C.red}55`}}>Get Started Free</button>
      </div>
    </div>
    {/* Hero — mountain landscape */}
    <div style={{position:"relative",minHeight:"100vh",overflow:"hidden",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
      {/* Sky gradient */}
      <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#0a1628 0%,#0d2550 25%,#1a4a7a 50%,#2d6e8a 65%,#3d8a7a 75%,#2a6a5a 85%,#1a3a3a 100%)"}}/>
      {/* Stars */}
      <div style={{position:"absolute",inset:0}}><Stars/></div>
      {/* Moon */}
      <div style={{position:"absolute",top:"8%",right:"15%",width:50,height:50,borderRadius:"50%",background:"radial-gradient(circle at 35% 35%, #fffde0, #f0d060)",boxShadow:"0 0 30px #f0d06066,0 0 60px #f0d06033"}}/>
      {/* Clouds */}
      <div style={{position:"absolute",top:"28%",left:"5%",opacity:0.7,animation:"float 6s ease-in-out infinite"}}>
        <div style={{width:120,height:40,background:"white",borderRadius:40,position:"relative",boxShadow:"0 4px 20px rgba(255,255,255,0.3)"}}>
          <div style={{position:"absolute",top:-18,left:20,width:60,height:45,background:"white",borderRadius:"50%"}}/>
          <div style={{position:"absolute",top:-10,left:50,width:45,height:35,background:"white",borderRadius:"50%"}}/>
        </div>
      </div>
      <div style={{position:"absolute",top:"22%",right:"8%",opacity:0.6,animation:"float 8s ease-in-out infinite",animationDelay:"2s"}}>
        <div style={{width:100,height:32,background:"white",borderRadius:40,position:"relative"}}>
          <div style={{position:"absolute",top:-14,left:15,width:50,height:38,background:"white",borderRadius:"50%"}}/>
          <div style={{position:"absolute",top:-8,left:40,width:38,height:30,background:"white",borderRadius:"50%"}}/>
        </div>
      </div>
      {/* Mountain layers */}
      <svg style={{position:"absolute",bottom:0,left:0,right:0,width:"100%"}} viewBox="0 0 1440 420" preserveAspectRatio="none">
        {/* Far mountains */}
        <polygon points="0,420 0,280 180,160 360,220 520,140 700,200 860,130 1040,190 1200,150 1440,200 1440,420" fill="#1a3a5a" opacity="0.8"/>
        {/* Mid mountains */}
        <polygon points="0,420 0,320 120,240 260,280 400,200 560,260 720,180 880,240 1020,200 1160,260 1300,210 1440,250 1440,420" fill="#1e4a4a" opacity="0.9"/>
        {/* Trees on mid */}
        {[80,160,240,400,480,600,680,760,900,980,1060,1160,1240].map((x,i)=><polygon key={i} points={`${x},${320-i%3*10} ${x-8},${340-i%3*10} ${x+8},${340-i%3*10}`} fill="#0d2d2d" opacity="0.7"/>)}
        {/* Near hills */}
        <polygon points="0,420 0,360 200,300 380,330 600,280 800,320 1000,290 1200,320 1440,300 1440,420" fill="#16353a"/>
        {/* Foreground */}
        <polygon points="0,420 0,390 300,370 600,380 900,365 1200,375 1440,370 1440,420" fill="#0d2020"/>
        {/* Trees foreground left */}
        {[40,80,120,160].map((x,i)=><g key={i}><polygon points={`${x},${400-i*5} ${x-12},420 ${x+12},420`} fill="#091818"/><polygon points={`${x},${375-i*5} ${x-10},${400-i*5} ${x+10},${400-i*5}`} fill="#091818"/></g>)}
        {/* Trees foreground right */}
        {[1280,1320,1360,1400].map((x,i)=><g key={i}><polygon points={`${x},${400-i*4} ${x-12},420 ${x+12},420`} fill="#091818"/><polygon points={`${x},${375-i*4} ${x-10},${400-i*4} ${x+10},${400-i*4}`} fill="#091818"/></g>)}
        {/* Cliff on left */}
        <polygon points="0,420 0,250 60,230 80,280 100,260 120,310 140,290 160,340 180,420" fill="#2a4a6a"/>
        <polygon points="1260,420 1280,360 1300,320 1320,350 1340,300 1360,340 1380,310 1440,320 1440,420" fill="#1e3a5a"/>
      </svg>
      {/* Water reflection */}
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:80,background:"linear-gradient(180deg,#1a4a5a88,#0d2a3a)"}}/>
      {/* Hero text */}
      <div style={{position:"relative",zIndex:10,textAlign:"center",padding:"0 24px",animation:"fadeUp 1s ease-out",marginTop:"-80px"}}>
        <div style={{marginBottom:16,display:"flex",justifyContent:"center"}}><Logo size={70}/></div>
        <h1 style={{fontSize:"clamp(36px,6vw,66px)",fontWeight:900,color:C.white,margin:"0 0 12px",lineHeight:1.1,letterSpacing:"-1px",textShadow:"0 2px 20px rgba(0,0,0,0.5)"}}>
          Your Future <span style={{color:C.yellow}}>Starts</span> Here.
        </h1>
        <p style={{fontSize:"clamp(15px,2vw,19px)",color:"rgba(255,255,255,0.8)",margin:"0 auto 32px",maxWidth:540,lineHeight:1.7,textShadow:"0 1px 8px rgba(0,0,0,0.4)"}}>
          Built for students who are <strong style={{color:C.yellow}}>short on time</strong> and held back by <strong style={{color:"#7ec8e3"}}>financial barriers</strong>. We find the scholarships — you focus on your future.
        </p>
        <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={onSignup} style={{background:`linear-gradient(135deg,${C.red},${C.yellow})`,color:C.white,border:"none",borderRadius:14,padding:"16px 40px",fontSize:17,fontWeight:800,cursor:"pointer",boxShadow:`0 6px 30px ${C.red}77`,letterSpacing:"0.3px"}}>Take the Quiz →</button>
          <button onClick={onLogin} style={{background:"rgba(255,255,255,0.12)",color:C.white,border:"1.5px solid rgba(255,255,255,0.3)",borderRadius:14,padding:"16px 32px",fontSize:17,fontWeight:700,cursor:"pointer",backdropFilter:"blur(8px)"}}>Log In</button>
        </div>
        <p style={{color:"rgba(255,255,255,0.4)",fontSize:13,marginTop:16}}>Free forever · No credit card · Trusted by Canadian students</p>
      </div>
      {/* Scroll hint */}
      <div style={{position:"absolute",bottom:90,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:6,opacity:0.5}}>
        <span style={{color:C.white,fontSize:11}}>Scroll to explore</span>
        <div style={{width:1,height:28,background:"linear-gradient(to bottom,rgba(255,255,255,0.6),transparent)"}}/>
      </div>
    </div>
    {/* Colour strip */}
    <div style={{height:5,background:`linear-gradient(90deg,${C.red},${C.yellow},${C.green},${C.blue})`}}/>
    {/* Mission */}
    <div style={{background:"#0f1e35",padding:"80px 24px",textAlign:"center"}}>
      <div style={{maxWidth:700,margin:"0 auto"}}>
        <div style={{fontSize:44,marginBottom:14}}>❤️</div>
        <h2 style={{color:C.white,fontSize:"clamp(24px,4vw,38px)",fontWeight:800,margin:"0 0 20px"}}>Why We Built <span style={{color:C.yellow}}>ScholarMatch</span></h2>
        <p style={{color:"rgba(255,255,255,0.7)",fontSize:"clamp(14px,2vw,17px)",lineHeight:1.9}}>Too many Canadian students miss out on scholarships — not because they don't deserve them, but because they don't have the <strong style={{color:"#7ec8e3"}}>time</strong> to search or the <strong style={{color:`${C.green}`}}>resources</strong> to navigate a complicated system. <strong style={{color:C.yellow}}>We find the money. You chase the dream.</strong></p>
      </div>
    </div>
    {/* Stats */}
    <div style={{background:"#0a1628",padding:"64px 24px"}}>
      <div style={{maxWidth:860,margin:"0 auto",display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
        {[["45+","Canadian Scholarships",C.blue],["🌐","Live Web Search",C.green],["2 min","Quiz to Results",C.yellow],["$0","Always Free",C.red]].map(([n,l,c])=>
          <div key={l} style={{flex:1,minWidth:150,background:`${c}15`,border:`1.5px solid ${c}44`,borderRadius:18,padding:"28px 16px",textAlign:"center",boxShadow:`0 4px 20px ${c}22`}}>
            <div style={{fontSize:32,fontWeight:900,color:c,marginBottom:6}}>{n}</div>
            <div style={{fontSize:13,color:"rgba(255,255,255,0.6)",fontWeight:600}}>{l}</div>
          </div>)}
      </div>
    </div>
    {/* Colour strip */}
    <div style={{height:5,background:`linear-gradient(90deg,${C.blue},${C.green},${C.yellow},${C.red})`}}/>
    {/* How it works */}
    <div style={{background:"#0f1e35",padding:"80px 24px"}}>
      <div style={{maxWidth:800,margin:"0 auto",textAlign:"center"}}>
        <h2 style={{color:C.white,fontSize:"clamp(22px,4vw,36px)",fontWeight:800,margin:"0 0 8px"}}>How It <span style={{color:"#7ec8e3"}}>Works</span></h2>
        <p style={{color:"rgba(255,255,255,0.5)",fontSize:15,marginBottom:48}}>Three simple steps between you and your scholarships.</p>
        <div style={{display:"flex",gap:20,justifyContent:"center",flexWrap:"wrap"}}>
          {[[C.red,"1","📝","Take the Quiz","Answer questions about your grade, interests, goals, and background."],[C.green,"2","🤖","AI Does the Work","Scans 45+ scholarships and searches the web for new personalized matches."],[C.blue,"3","🎯","Get Your Matches","Ranked results with how to apply, checklists, and planning help."]].map(([c,n,e,t,d])=>
            <div key={n} style={{flex:1,minWidth:200,maxWidth:230,background:"rgba(255,255,255,0.05)",borderRadius:18,padding:"28px 20px",border:`1.5px solid ${c}44`,textAlign:"center"}}>
              <div style={{width:44,height:44,borderRadius:"50%",background:c,color:C.white,fontWeight:900,fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",boxShadow:`0 4px 16px ${c}66`}}>{n}</div>
              <div style={{fontSize:30,marginBottom:10}}>{e}</div>
              <div style={{fontWeight:800,fontSize:16,color:C.white,marginBottom:8}}>{t}</div>
              <div style={{fontSize:13,color:"rgba(255,255,255,0.5)",lineHeight:1.6}}>{d}</div>
            </div>)}
        </div>
      </div>
    </div>
    {/* CTA */}
    <div style={{background:"#0a1628",padding:"80px 24px",textAlign:"center"}}>
      <Logo size={60}/>
      <h2 style={{color:C.white,fontSize:"clamp(24px,4vw,40px)",fontWeight:900,margin:"20px 0 12px"}}>Ready for Your <span style={{color:C.yellow}}>Scholarship?</span></h2>
      <p style={{color:"rgba(255,255,255,0.5)",fontSize:15,marginBottom:32}}>Join thousands of Canadian students who stopped searching and started applying.</p>
      <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
        <button onClick={onSignup} style={{background:`linear-gradient(135deg,${C.red},${C.yellow})`,color:C.white,border:"none",borderRadius:14,padding:"16px 40px",fontSize:16,fontWeight:800,cursor:"pointer",boxShadow:`0 6px 24px ${C.red}55`}}>Create Free Account →</button>
        <button onClick={onLogin} style={{background:"rgba(255,255,255,0.08)",color:C.white,border:"1.5px solid rgba(255,255,255,0.2)",borderRadius:14,padding:"16px 28px",fontSize:15,fontWeight:700,cursor:"pointer"}}>Log In</button>
      </div>
    </div>
    <div style={{height:5,background:`linear-gradient(90deg,${C.red},${C.yellow},${C.green},${C.blue})`}}/>
  </div>;
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function App(){
  const [screen,setScreen]=useState("home");
  const [step,setStep]=useState(0);
  const [loadStage,setLoadStage]=useState(0);
  const [users,setUsers]=useState({});
  const [user,setUser]=useState(null);
  const [aF,setAF]=useState({name:"",email:"",password:""});
  const [aErr,setAErr]=useState("");
  const [form,setForm]=useState({grade:"",gpa:"",province:"",language:"",interests:[],passions:[],customPassions:[],customPassionInput:"",customPassionError:"",goal:"",studyLength:"",incomeGoal:"",university:"",firstGen:"",financialNeed:"",extracurriculars:[],extraOther:"",ethnicity:""});
  const [showCareerConfirm,setShowCareerConfirm]=useState(false);
  const [showCareerSuggest,setShowCareerSuggest]=useState(false);
  const [results,setResults]=useState(null);
  const [saved,setSaved]=useState([]);
  const [applied,setApplied]=useState([]);
  const [visibleCount,setVisibleCount]=useState(10);
  const [loadingMore,setLoadingMore]=useState(false);
  const [noMore,setNoMore]=useState(false);
  const [dashTab,setDashTab]=useState("overview");
  const [prevScreen,setPrevScreen]=useState("results");

  const af=(k,v)=>setAF(f=>({...f,[k]:v}));
  const ff=(k,v)=>setForm(f=>({...f,[k]:v}));
  const tog=(k,v)=>setForm(f=>{const a=f[k];return{...f,[k]:a.includes(v)?a.filter(x=>x!==v):[...a,v]};});

  // Validate and add custom passion
  const addCustomPassion=async()=>{
    const input=form.customPassionInput.trim();
    if(!input)return;
    ff("customPassionError","");
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:50,messages:[{role:"user",content:`Is "${input}" a genuine human passion, hobby, or interest? Answer only YES or NO.`}]})});
      const data=await res.json();
      const answer=data.content?.map(b=>b.text||"").join("").toUpperCase()||"NO";
      if(answer.includes("YES")){
        setForm(f=>({...f,customPassions:[...f.customPassions,input],customPassionInput:"",customPassionError:""}));
      }else{
        ff("customPassionError",`"${input}" doesn't seem like a real passion. Try something like "Photography", "Cooking", or "Robotics".`);
      }
    }catch(e){
      setForm(f=>({...f,customPassions:[...f.customPassions,input],customPassionInput:"",customPassionError:""}));
    }
  };

  const signup=()=>{
    if(!aF.name||!aF.email||!aF.password)return setAErr("Please fill in all fields.");
    if(!/\S+@\S+\.\S+/.test(aF.email))return setAErr("Enter a valid email.");
    if(users[aF.email])return setAErr("Account already exists.");
    const u={name:aF.name,email:aF.email,password:aF.password};
    setUsers(x=>({...x,[aF.email]:u}));setUser(u);setAErr("");setScreen("quiz");setStep(0);
  };
  const login=()=>{
    const u=users[aF.email];
    if(!u)return setAErr("No account found.");
    if(u.password!==aF.password)return setAErr("Incorrect password.");
    setUser(u);setAErr("");setScreen(results?"results":"quiz");
  };
  const logout=()=>{setUser(null);setScreen("home");};
  const retakeQuiz=()=>{setStep(0);setForm({grade:"",gpa:"",province:"",language:"",interests:[],passions:[],customPassions:[],customPassionInput:"",customPassionError:"",goal:"",studyLength:"",incomeGoal:"",university:"",firstGen:"",financialNeed:"",extracurriculars:[],extraOther:"",ethnicity:""});setResults(null);setSaved([]);setApplied([]);setScreen("quiz");};

  const handleGoalNext=()=>{
    const g=form.goal.trim();
    if(g.length<3){alert("Please enter a specific career title like 'Software Engineer' or 'Doctor'.");return;}
    setShowCareerConfirm(true);
  };

  const runMatch=async()=>{
    setShowCareerConfirm(false);
    setScreen("loading");setLoadStage(0);
    const dbScored=DB.map(s=>({...s,score:scoreMatch(s,form),source:"db"}));
    await new Promise(r=>setTimeout(r,900));setLoadStage(1);
    let aiResults=[];
    try{
      const p=`Find 10 real Canadian scholarships for: Grade:${form.grade}, Average:${form.gpa}, Province:${form.province}, Interests:${form.interests.join(",")}, Goal:${form.goal}, Financial need:${form.financialNeed}, Ethnicity:${form.ethnicity}. Return JSON array with name,amount,description,howToApply,requirements,deadline,link. JSON only.`;
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,tools:[{type:"web_search_20250305",name:"web_search"}],messages:[{role:"user",content:p}]})});
      const data=await res.json();
      const text=data.content?.filter(b=>b.type==="text").map(b=>b.text).join("")||"[]";
      const parsed=JSON.parse(text.replace(/```json|```/g,"").trim());
      if(Array.isArray(parsed))aiResults=parsed.map(s=>({...s,score:8,source:"ai",verified:false,checklist:["Write personal statement","Gather references","Prepare transcripts","Submit application"]}));
    }catch(e){}
    await new Promise(r=>setTimeout(r,700));setLoadStage(2);
    const all=[...dbScored,...aiResults];
    const seen=new Set();
    const deduped=all.filter(s=>{if(seen.has(s.name.toLowerCase()))return false;seen.add(s.name.toLowerCase());return true;});
    const top=deduped.sort((a,b)=>b.score-a.score).slice(0,50);
    try{
      const rp=`Write a SHORT (1-2 sentence) warm personalized reason why each scholarship matches this student.
Student: Interests:${form.interests.join(",")}, Passions:${[...form.passions,...(form.customPassions||[])].join(",")}, Goal:${form.goal}, Grade:${form.grade}, Financial need:${form.financialNeed}, Province:${form.province}, Ethnicity:${form.ethnicity}.
Scholarships:
${top.map((s,i)=>`${i+1}. ${s.name}: ${s.description}`).join("\n")}
Return JSON array of ${top.length} reason strings. JSON only.`;
      const rRes=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:rp}]})});
      const rData=await rRes.json();
      const reasons=JSON.parse(rData.content?.map(b=>b.text||"").join("").replace(/```json|```/g,"").trim()||"[]");
      if(Array.isArray(reasons))reasons.forEach((r,i)=>{if(top[i])top[i].reason=r;});
    }catch(e){top.forEach(s=>{s.reason=s.reason||`Matches your interest in ${form.interests.slice(0,2).join(" and ")} and goal of becoming a ${form.goal}.`;});}
    await new Promise(r=>setTimeout(r,600));setLoadStage(3);
    await new Promise(r=>setTimeout(r,500));
    setResults(top);setVisibleCount(10);setNoMore(false);
    const updated={...user,profile:{...form,name:user.name,email:user.email}};
    setUser(updated);setUsers(x=>({...x,[user.email]:updated}));
    setScreen("results");
    // Show career suggestions after a short delay
    setTimeout(()=>setShowCareerSuggest(true),1000);
  };

  const loadMore=async()=>{
    if(visibleCount<results.length){setVisibleCount(v=>v+10);return;}
    setLoadingMore(true);
    try{
      const existing=results.map(r=>r.name.toLowerCase());
      const p=`Find 10 MORE real Canadian scholarships NOT in this list: ${existing.join(",")}.
Student: Grade:${form.grade}, Province:${form.province}, Interests:${form.interests.join(",")}, Goal:${form.goal}.
Return JSON array with name,amount,description,howToApply,requirements,deadline,link. If none found return []. JSON only.`;
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,tools:[{type:"web_search_20250305",name:"web_search"}],messages:[{role:"user",content:p}]})});
      const data=await res.json();
      const text=data.content?.filter(b=>b.type==="text").map(b=>b.text).join("")||"[]";
      const parsed=JSON.parse(text.replace(/```json|```/g,"").trim());
      if(!Array.isArray(parsed)||!parsed.length){setNoMore(true);setLoadingMore(false);return;}
      const newOnes=parsed.filter(s=>!existing.includes(s.name.toLowerCase())).map(s=>({...s,score:6,source:"ai",verified:false,checklist:["Write personal statement","Gather references","Prepare transcripts","Submit application"],reason:`Found by web search — matched to your interest in ${form.interests.slice(0,2).join(" & ")} and goal of becoming a ${form.goal}.`}));
      if(!newOnes.length){setNoMore(true);setLoadingMore(false);return;}
      setResults(p=>[...p,...newOnes]);setVisibleCount(v=>v+newOnes.length);
    }catch(e){setNoMore(true);}
    setLoadingMore(false);
  };

  const toggleSave=n=>setSaved(s=>s.includes(n)?s.filter(x=>x!==n):[...s,n]);
  const toggleApplied=n=>setApplied(a=>a.includes(n)?a.filter(x=>x!==n):[...a,n]);

  const wrap={minHeight:"100vh",background:C.white,display:"flex",alignItems:"center",justifyContent:"center",padding:16,fontFamily:"'Segoe UI',sans-serif"};
  const card={background:C.white,borderRadius:20,padding:28,maxWidth:550,width:"100%",boxShadow:"0 8px 32px #0002",border:"1px solid #f0f0f0"};

  const NavBar=()=><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
    <div style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}} onClick={()=>setScreen("home")}>
      <Logo size={30}/><span style={{fontWeight:800,color:C.red,fontSize:16}}>ScholarMatch</span>
    </div>
    {user&&<div style={{display:"flex",gap:8,alignItems:"center"}}>
      <span style={{fontSize:12,color:C.muted}}>{user.name}</span>
      {screen!=="dashboard"&&<Btn small outline color={C.blue} onClick={()=>setScreen("dashboard")}>Dashboard</Btn>}
      <Btn small outline color={C.red} onClick={logout}>Logout</Btn>
    </div>}
  </div>;

  if(screen==="loading")return <LoadingScreen stage={loadStage}/>;
  if(screen==="home")return <HomePage onSignup={()=>{setAF({name:"",email:"",password:""});setAErr("");setScreen("signup");}} onLogin={()=>{setAF({name:"",email:"",password:""});setAErr("");setScreen("login");}}/>;

  if(screen==="signup")return <div style={wrap}><div style={card}><NavBar/>
    <h2 style={{color:C.red,margin:"0 0 18px"}}>Create Your Account</h2>
    <Inp label="Full Name" value={aF.name} onChange={e=>af("name",e.target.value)} placeholder="Jane Doe"/>
    <Inp label="Email Address" value={aF.email} onChange={e=>af("email",e.target.value)} placeholder="jane@example.ca" type="email"/>
    <Inp label="Password" value={aF.password} onChange={e=>af("password",e.target.value)} placeholder="Create a password" type="password"/>
    {aErr&&<div style={{color:C.red,fontSize:13,marginBottom:12,background:C.redL,padding:"9px 13px",borderRadius:9}}>⚠️ {aErr}</div>}
    <Btn full onClick={signup}>Create Account & Start Quiz →</Btn>
    <p style={{textAlign:"center",marginTop:14,fontSize:13,color:C.muted}}>Have an account? <button onClick={()=>setScreen("login")} style={{background:"none",border:"none",color:C.blue,cursor:"pointer",fontWeight:700,fontSize:13}}>Log In</button></p>
  </div></div>;

  if(screen==="login")return <div style={wrap}><div style={card}><NavBar/>
    <h2 style={{color:C.red,margin:"0 0 18px"}}>Welcome Back</h2>
    <Inp label="Email Address" value={aF.email} onChange={e=>af("email",e.target.value)} placeholder="jane@example.ca" type="email"/>
    <Inp label="Password" value={aF.password} onChange={e=>af("password",e.target.value)} placeholder="Your password" type="password"/>
    {aErr&&<div style={{color:C.red,fontSize:13,marginBottom:12,background:C.redL,padding:"9px 13px",borderRadius:9}}>⚠️ {aErr}</div>}
    <Btn full onClick={login}>Log In →</Btn>
    <p style={{textAlign:"center",marginTop:14,fontSize:13,color:C.muted}}>No account? <button onClick={()=>setScreen("signup")} style={{background:"none",border:"none",color:C.blue,cursor:"pointer",fontWeight:700,fontSize:13}}>Sign Up Free</button></p>
  </div></div>;

  if(screen==="quiz")return <>
    {showCareerConfirm&&<CareerConfirm goal={form.goal} onConfirm={runMatch} onEdit={()=>setShowCareerConfirm(false)}/>}
    <div style={wrap}><div style={{...card,maxWidth:600}}>
      <NavBar/><ProgressBar step={step}/>
      {step===0&&<><h2 style={{color:C.text,margin:"0 0 4px"}}>The Basics</h2><p style={{color:C.muted,fontSize:13,marginBottom:16}}>Tell us about your current situation.</p>
        <label style={{fontWeight:600,fontSize:13,color:C.text}}>What grade are you in?</label>
        <div style={{display:"flex",flexWrap:"wrap",margin:"8px 0 14px"}}>{GRADES.map(g=><Tag key={g} label={g} selected={form.grade===g} color={C.red} onClick={()=>ff("grade",g)}/>)}</div>
        <label style={{fontWeight:600,fontSize:13,color:C.text}}>Current average?</label>
        <div style={{display:"flex",flexWrap:"wrap",margin:"8px 0 14px"}}>{GPAS.map(g=><Tag key={g} label={g} selected={form.gpa===g} color={C.blue} onClick={()=>ff("gpa",g)}/>)}</div>
        <label style={{fontWeight:600,fontSize:13,color:C.text}}>Province or Territory</label>
        <div style={{display:"flex",flexWrap:"wrap",margin:"8px 0 14px"}}>{PROVINCES.map(p=><Tag key={p} label={p} selected={form.province===p} color={C.green} onClick={()=>ff("province",p)}/>)}</div>
        <label style={{fontWeight:600,fontSize:13,color:C.text}}>Primary language at home</label>
        <div style={{display:"flex",flexWrap:"wrap",margin:"8px 0 16px"}}>{LANGUAGES.map(l=><Tag key={l} label={l} selected={form.language===l} color={C.yellow} onClick={()=>ff("language",l)}/>)}</div>
        <Btn full disabled={!form.grade||!form.gpa} onClick={()=>setStep(1)} color={C.red}>Next →</Btn>
      </>}
      {step===1&&<><h2 style={{color:C.text,margin:"0 0 4px"}}>Interests & Passions</h2><p style={{color:C.muted,fontSize:13,marginBottom:14}}>Pick subjects (up to 4) and passions — or write your own!</p>
        <label style={{fontWeight:600,fontSize:13,color:C.text}}>Subjects you enjoy:</label>
        <div style={{display:"flex",flexWrap:"wrap",margin:"8px 0 14px"}}>{INTERESTS.map(i=><Tag key={i} label={i} selected={form.interests.includes(i)} color={C.blue} onClick={()=>{if(!form.interests.includes(i)&&form.interests.length>=4)return;tog("interests",i);}}/>)}</div>
        <label style={{fontWeight:600,fontSize:13,color:C.text}}>Your passions (pick or write your own):</label>
        <div style={{display:"flex",flexWrap:"wrap",margin:"8px 0 10px"}}>{PASSIONS_PRESET.map(p=><Tag key={p} label={p} selected={form.passions.includes(p)} color={C.green} onClick={()=>{if(!form.passions.includes(p)&&(form.passions.length+(form.customPassions||[]).length)>=5)return;tog("passions",p);}}/>)}</div>
        {/* Custom passion tags */}
        {(form.customPassions||[]).map((p,i)=><span key={i} style={{display:"inline-flex",alignItems:"center",gap:5,background:C.green+"22",border:`2px solid ${C.green}`,borderRadius:20,padding:"5px 12px",margin:3,fontSize:13,color:C.green,fontWeight:700}}>
          {p}<button onClick={()=>setForm(f=>({...f,customPassions:f.customPassions.filter((_,j)=>j!==i)}))} style={{background:"none",border:"none",cursor:"pointer",color:C.green,fontSize:14,fontWeight:900,padding:0}}>×</button>
        </span>)}
        {/* Custom passion input */}
        <div style={{display:"flex",gap:8,marginTop:8,marginBottom:4}}>
          <input value={form.customPassionInput} onChange={e=>ff("customPassionInput",e.target.value)} onKeyDown={e=>e.key==="Enter"&&addCustomPassion()} placeholder="Type your own passion…" style={{flex:1,padding:"9px 13px",borderRadius:10,border:"1.5px solid #ddd",fontSize:13,fontFamily:"inherit",outline:"none"}}/>
          <button onClick={addCustomPassion} style={{background:C.green,color:C.white,border:"none",borderRadius:10,padding:"9px 16px",cursor:"pointer",fontWeight:700,fontSize:13}}>Add</button>
        </div>
        {form.customPassionError&&<p style={{fontSize:12,color:C.red,margin:"4px 0 8px"}}>{form.customPassionError}</p>}
        <p style={{fontSize:11,color:C.muted,margin:"4px 0 14px"}}>Up to 5 total passions. Examples: Photography, Cooking, Robotics, Gaming</p>
        <div style={{display:"flex",gap:10,marginTop:8,alignItems:"center"}}>
          <Btn outline color={C.red} onClick={()=>setStep(0)}>← Back</Btn>
          <Btn disabled={!form.interests.length} onClick={()=>setStep(2)} color={C.red}>Next →</Btn>
          <button onClick={()=>setStep(2)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:13,textDecoration:"underline"}}>Skip</button>
        </div>
      </>}
      {step===2&&<><h2 style={{color:C.text,margin:"0 0 4px"}}>Education & Activities</h2><p style={{color:C.muted,fontSize:13,marginBottom:14}}>Tell us about your university and activities.</p>
        <label style={{fontWeight:600,fontSize:13,color:C.text}}>How long do you plan to study?</label>
        <div style={{display:"flex",flexWrap:"wrap",margin:"8px 0 14px"}}>{STUDY_LENGTHS.map(s=><Tag key={s} label={s} selected={form.studyLength===s} color={C.blue} onClick={()=>ff("studyLength",s)}/>)}</div>
        <label style={{fontWeight:600,fontSize:13,color:C.text}}>University you're interested in?</label>
        <div style={{display:"flex",flexWrap:"wrap",margin:"8px 0 14px"}}>{UNIVERSITIES.map(u=><Tag key={u} label={u} selected={form.university===u} color={C.red} onClick={()=>ff("university",u)}/>)}</div>
        <label style={{fontWeight:600,fontSize:13,color:C.text}}>Extracurricular activities</label>
        <div style={{display:"flex",flexWrap:"wrap",margin:"8px 0 8px"}}>{EXTRA.map(e=><Tag key={e} label={e} selected={form.extracurriculars.includes(e)} color={C.yellow} onClick={()=>tog("extracurriculars",e)}/>)}</div>
        <label style={{fontWeight:600,fontSize:13,color:C.text,display:"block",marginTop:8}}>Other activities? (optional)</label>
        <input value={form.extraOther} onChange={e=>ff("extraOther",e.target.value)} placeholder="e.g. Debate club, robotics, photography…" style={{width:"100%",padding:"10px 13px",borderRadius:10,border:"1.5px solid #ddd",fontSize:13,boxSizing:"border-box",outline:"none",fontFamily:"inherit",marginTop:6,marginBottom:14}}/>
        <label style={{fontWeight:600,fontSize:13,color:C.text}}>Racial/ethnic background? <span style={{fontWeight:400,color:C.muted}}>(optional)</span></label>
        <div style={{display:"flex",flexWrap:"wrap",margin:"8px 0 14px"}}>{ETHNICITIES.map(e=><Tag key={e} label={e} selected={form.ethnicity===e} color={C.blue} onClick={()=>ff("ethnicity",e)}/>)}</div>
        <div style={{display:"flex",gap:10,marginTop:8}}><Btn outline color={C.red} onClick={()=>setStep(1)}>← Back</Btn><Btn disabled={!form.university||!form.studyLength} onClick={()=>setStep(3)} color={C.red}>Next →</Btn></div>
      </>}
      {step===3&&<><h2 style={{color:C.text,margin:"0 0 4px"}}>Background</h2><p style={{color:C.muted,fontSize:13,marginBottom:14}}>Tell us about your background and financial situation.</p>
        <label style={{fontWeight:600,fontSize:13,color:C.text}}>First in your family to attend university?</label>
        <div style={{display:"flex",flexWrap:"wrap",margin:"8px 0 14px"}}>{FIRST_GEN.map(f=><Tag key={f} label={f} selected={form.firstGen===f} color={C.blue} onClick={()=>ff("firstGen",f)}/>)}</div>
        <label style={{fontWeight:600,fontSize:13,color:C.text}}>How important is financial aid?</label>
        <div style={{display:"flex",flexWrap:"wrap",margin:"8px 0 14px"}}>{FINANCIAL_NEEDS.map(f=><Tag key={f} label={f} selected={form.financialNeed===f} color={C.green} onClick={()=>ff("financialNeed",f)}/>)}</div>
        <label style={{fontWeight:600,fontSize:13,color:C.text}}>Income goal one day?</label>
        <div style={{display:"flex",flexWrap:"wrap",margin:"8px 0 14px"}}>{INCOME_GOALS.map(i=><Tag key={i} label={i} selected={form.incomeGoal===i} color={C.yellow} onClick={()=>ff("incomeGoal",i)}/>)}</div>
        <div style={{display:"flex",gap:10,marginTop:8}}><Btn outline color={C.red} onClick={()=>setStep(2)}>← Back</Btn><Btn disabled={!form.firstGen||!form.financialNeed} onClick={()=>setStep(4)} color={C.red}>Next →</Btn></div>
      </>}
      {step===4&&<><h2 style={{color:C.text,margin:"0 0 4px"}}>Your Dream Career 🎯</h2><p style={{color:C.muted,fontSize:13,marginBottom:14}}>Last question! Tell us where you want to go — we'll confirm it and find your best matches.</p>
        <Inp label="What is your dream career?" value={form.goal} onChange={e=>ff("goal",e.target.value)} placeholder="e.g. Software Engineer, Doctor, Lawyer, Teacher…"/>
        {form.goal.trim().length>0&&form.goal.trim().length<3&&<p style={{fontSize:12,color:C.red,margin:"-8px 0 8px"}}>Please enter a specific career title.</p>}
        <div style={{background:C.yellowL,borderRadius:10,padding:"10px 14px",fontSize:13,color:"#666",marginBottom:14,border:`1px solid ${C.yellow}33`}}>
          💡 Be specific! "Doctor" or "Software Engineer" works better than "something in science".
        </div>
        <div style={{display:"flex",gap:10,marginTop:8}}><Btn outline color={C.red} onClick={()=>setStep(3)}>← Back</Btn><Btn disabled={!form.goal.trim()||form.goal.trim().length<3} onClick={handleGoalNext} color={C.red}>Find My Scholarships 🎯</Btn></div>
      </>}
    </div></div>
  </>;

  if(screen==="planning")return <PlanningPage results={results} form={form} onBack={()=>setScreen(prevScreen)}/>;

  if(screen==="results"&&results)return(
    <div style={{minHeight:"100vh",background:`linear-gradient(135deg,${C.redL} 0%,#fff 45%,${C.blueL} 100%)`,padding:"0 0 60px",fontFamily:"'Segoe UI',sans-serif"}}>
      {showCareerSuggest&&<CareerSuggestModal form={form} onClose={()=>setShowCareerSuggest(false)}/>}
      {/* Top action bar */}
      <div style={{background:C.white,borderBottom:"1px solid #f0f0f0",padding:"12px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8,position:"sticky",top:0,zIndex:50,boxShadow:"0 2px 8px #0001"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}} onClick={()=>setScreen("home")}><Logo size={26}/><span style={{fontWeight:800,color:C.red,fontSize:15}}>ScholarMatch</span></div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <button onClick={()=>{setPrevScreen("results");setScreen("planning");}} style={{background:`linear-gradient(135deg,${C.red},${C.yellow})`,color:C.white,border:"none",borderRadius:10,padding:"8px 16px",cursor:"pointer",fontWeight:700,fontSize:13}}>✍️ Planning Assistant</button>
          <button onClick={()=>setShowCareerSuggest(true)} style={{background:C.blueL,color:C.blue,border:`1.5px solid ${C.blue}33`,borderRadius:10,padding:"8px 14px",cursor:"pointer",fontWeight:700,fontSize:13}}>🌟 Career Ideas</button>
          {user&&<><span style={{fontSize:12,color:C.muted,alignSelf:"center"}}>{user.name}</span>
          <Btn small outline color={C.blue} onClick={()=>setScreen("dashboard")}>Dashboard</Btn>
          <Btn small outline color={C.red} onClick={logout}>Logout</Btn></>}
        </div>
      </div>
      <div style={{maxWidth:1100,margin:"0 auto",display:"flex",gap:24,alignItems:"flex-start",padding:"24px 16px 0"}}>
        <div style={{flex:1,minWidth:0}}>
          <div style={{marginBottom:16}}>
            <h2 style={{margin:0,color:C.red}}>Your Scholarship Matches</h2>
            <p style={{margin:"4px 0 0",color:C.muted,fontSize:13}}>{results.length} scholarships ranked · AI-written reasons · {user?.name?.split(" ")[0]}</p>
          </div>
          <div style={{background:C.yellowL,borderRadius:12,padding:"10px 14px",marginBottom:16,border:`1px solid ${C.yellow}44`,fontSize:13}}>
            🏆 <strong>Top match:</strong> {results[0]?.name} — {results[0]?.amount}
          </div>
          {results.slice(0,visibleCount).map((opp,i)=><ScholarCard key={i} opp={opp} rank={i} onSave={()=>toggleSave(opp.name)} saved={saved.includes(opp.name)} applied={applied.includes(opp.name)} onToggleApplied={()=>toggleApplied(opp.name)}/>)}
          <div style={{display:"flex",gap:10,marginTop:8,flexWrap:"wrap",alignItems:"center"}}>
            {noMore
              ?<div style={{flex:1,padding:"12px 16px",borderRadius:12,background:"#f5f5f5",color:C.muted,fontSize:13,textAlign:"center",border:"1.5px dashed #ddd"}}>😔 Unable to load more at this time. Check back later or retake the quiz!</div>
              :<button onClick={loadMore} disabled={loadingMore} style={{flex:1,padding:"12px 0",borderRadius:12,border:`2px dashed ${C.blue}`,background:loadingMore?C.blueL:"#fff",color:C.blue,fontWeight:700,fontSize:14,cursor:loadingMore?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                {loadingMore?<><div style={{width:16,height:16,borderRadius:"50%",border:`2px solid ${C.blue}`,borderTopColor:"transparent",animation:"spin 0.8s linear infinite"}}/> Searching the web for more…</>:visibleCount<results.length?<>Show More ({results.length-visibleCount} remaining) ↓</>:<>🌐 Search Web for More Scholarships</>}
              </button>}
            <Btn small outline color={C.red} onClick={retakeQuiz}>Retake Quiz</Btn>
          </div>
        </div>
        <div style={{width:210,flexShrink:0}}><SidePanel results={results} saved={saved} form={form} applied={applied}/></div>
      </div>
      <ChatBox profile={{...form,name:user?.name}}/>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  if(screen==="dashboard")return(
    <div style={{minHeight:"100vh",background:`linear-gradient(135deg,${C.redL} 0%,#fff 45%,${C.blueL} 100%)`,padding:"28px 16px",fontFamily:"'Segoe UI',sans-serif"}}>
      <div style={{maxWidth:800,margin:"0 auto"}}>
        <NavBar/>
        <div style={{background:C.white,borderRadius:16,padding:20,marginBottom:16,boxShadow:"0 2px 12px #0001",border:`1.5px solid ${C.green}33`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{fontWeight:700,color:C.green,fontSize:15}}>📊 Application Progress</div>
            <span style={{fontSize:13,color:C.muted}}>{applied.length} of {saved.length} applied</span>
          </div>
          <div style={{height:10,background:"#eee",borderRadius:6}}>
            <div style={{height:10,background:`linear-gradient(90deg,${C.green},${C.yellow})`,borderRadius:6,width:saved.length>0?`${(applied.length/saved.length)*100}%`:"0%",transition:"width 0.5s"}}/>
          </div>
          {!saved.length&&<p style={{fontSize:13,color:C.muted,margin:"8px 0 0"}}>Save scholarships from your results to track progress here!</p>}
        </div>
        <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
          {[["overview","📋 Overview"],["calendar","📅 Calendar"]].map(([t,l])=>
            <button key={t} onClick={()=>setDashTab(t)} style={{padding:"9px 18px",borderRadius:10,border:"none",cursor:"pointer",fontWeight:700,fontSize:13,background:dashTab===t?C.red:"#f0f0f0",color:dashTab===t?C.white:C.muted}}>{l}</button>)}
        </div>
        <div style={{background:C.white,borderRadius:16,padding:24,boxShadow:"0 2px 12px #0001"}}>
          {dashTab==="overview"&&<>
            <div style={{display:"flex",gap:12,marginBottom:20,flexWrap:"wrap"}}>
              {[["🎓",results?.length||0,"Scholarships",C.blue],["★",saved.length,"Saved",C.yellow],["✅",applied.length,"Applied",C.green],["🌐",results?.filter(r=>r.source==="ai").length||0,"Web Found",C.red]].map(([e,n,l,c])=>
                <div key={l} style={{flex:1,minWidth:100,background:c+"15",border:`1.5px solid ${c}33`,borderRadius:12,padding:"14px 12px",textAlign:"center"}}>
                  <div style={{fontSize:20}}>{e}</div><div style={{fontWeight:700,fontSize:22,color:c}}>{n}</div><div style={{fontSize:11,color:C.muted}}>{l}</div>
                </div>)}
            </div>
            {user?.profile&&<div style={{background:C.redL,borderRadius:12,padding:"14px 16px",marginBottom:16,border:`1px solid ${C.red}22`}}>
              <div style={{fontWeight:700,color:C.red,marginBottom:8}}>Your Profile</div>
              <div style={{fontSize:13,color:C.text,display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
                {[[user.profile.grade,"📚"],[user.profile.gpa,"📊"],[user.profile.province,"📍"],[user.profile.goal,"🎯"],[user.profile.university,"🏫"],[user.profile.incomeGoal,"💰"]].filter(([v])=>v).map(([v,e])=><span key={v}>{e} {v}</span>)}
              </div>
            </div>}
            {saved.length>0&&<div style={{marginBottom:16}}>
              <div style={{fontWeight:700,color:C.yellow,marginBottom:8}}>★ Saved Scholarships</div>
              {results?.filter(o=>saved.includes(o.name)).map((o,i)=>
                <div key={i} style={{background:C.yellowL,border:`1px solid ${C.yellow}44`,borderRadius:10,padding:"10px 14px",marginBottom:8,fontSize:13,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div><span style={{fontWeight:600}}>{o.name}</span>{applied.includes(o.name)&&<span style={{marginLeft:8,fontSize:11,color:C.green,fontWeight:700}}>✅ Applied</span>}</div>
                  <span style={{color:C.muted}}>{o.amount}</span>
                </div>)}
            </div>}
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              {results&&<Btn small color={C.blue} onClick={()=>setScreen("results")}>View All Matches</Btn>}
              <Btn small color={C.red} onClick={retakeQuiz}>{results?"Retake Quiz":"Start Quiz"}</Btn>
            </div>
          </>}
          {dashTab==="calendar"&&<CalendarPage results={results} saved={saved}/>}
        </div>
      </div>
      <ChatBox profile={{...user?.profile,name:user?.name}}/>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
  return null;
}
