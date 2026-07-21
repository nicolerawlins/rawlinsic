export type TeamMember = {
  id: number;
  name: string;
  photo: string;
  title?: string;
  role: string;
  location: string;
  phone: string;
  phone2?: string;
  email: string;
  linkedin?: string;
  background: string;
  achievements: string;
  categories: string[];
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 48,
    name: `Scott Rawlins, P.E.`,
    photo: `/images/team/scott.webp`,
  title: `Founder`,
    role: `Transportation Programs`,
    location: `Nevada`,
    phone: `(775) 843-3822`,
    email: `scott@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/scott-rawlinsinfraconsult/`,
    background: `Scott has over 33 years in the Transportation industry experience. He has helped DOTs from around the country in improving their overall program delivery and organizational design. He also spent a career with the State of Nevada Department of Transportation.

He had responsibility for the daily operations of the Department, as the Deputy Director and Chief Engineer, which had over 1800 employees and an annual budget over $1 Billion.`,
    achievements: `He was the driver in the development of key programs and was responsible for the strategic direction of those programs, such as:

- A state Transportation Asset Management Plan that incorporated performance metrics and sought efficiency opportunities for delivering maintenance activities.
- Fleet Optimization program to preserve, refurbish and rebuild the 2,700 pieces of equipment.
- A Strategic Data Plan that developed a centralized data repository and management system for asset inventories, and a plan to integrate data sets for assessment of current conditions and performance.
- 5-Year program of projects that created a systematic approach to program development.
- The Pioneer Program that focused on Public-Private Partnerships and alternative delivery methods such as Design-Build and Construction Manager/General Contractor.
- Project Management Program based on matrix management.
- Integrated Transportation Reliability Program focused on the proactive operation of the transportation system.

From planning, design, construction, operations and maintenance, Scott maneuvered the department through federal, state, and local regulations and politics.`,
    categories: ['strategy'],
  },
  {
    id: 42,
    name: `Paul Steinman, P.E.`,
    photo: `/images/team/paulsteinman.webp`,
    role: `Construction Programs`,
    location: `Florida`,
    phone: `+1 850-363-0947`,
    email: `paul@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/paulsteinman/`,
    background: `Paul brings more than 34 years of Transportation Industry experience. He has a diverse background in executive leadership having served in three different transportation departments, including Michigan, Florida, and Idaho. Each department varied greatly with respect to financial capacities, geography, size, and political dynamics.`,
    achievements: `He delivered a wide range of projects, including P3's, alternative delivery contracts, and a managed lanes program. During his tenure as part of the executive leadership within transportation departments, he has worked to create targeted initiatives that could be communicated to all levels of the organization. His plans empowered employees to embrace accountability and achieve initiatives, which, in turn, enabled the department to exceed expectations for those customers whom they serve.

As part of the consulting sector for the past five years, he has served as project manager for the NCDOT Strategic Services contract, providing leadership on the optimization of the preconstruction process for delivering the capital work program within North Carolina. Paul provided executive counsel to the Tennessee Department of Transportation and lead the initiative to complete an organizational optimization department-wide.

The goal of this effort was to reduce middle management within TDOT, push decision making to the lowest appropriate level, and use the salary savings to provide market-based salary increases to department staff. Paul assisted the TDOT Executive Team in the development of a 5-Year Work Program that reimagined how TDOT could create a fiscally constrained capital work program with a focus on the stewardship of a project's scope, schedule, budget, risk, and quality.`,
    categories: ['strategy', 'operations'],
  },
  {
    id: 41,
    name: `Paul Schneider, P.E.`,
    photo: `/images/team/paulschneider.webp`,
    role: `Federal Programs`,
    location: `Nevada`,
    phone: `+1 775-230-6579`,
    email: `pauls@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/paul-schneider-13882/`,
    background: `Paul brings over 39 years of Transportation Industry experience. Most recently, Paul was an executive in the FHWA California Division Office where he partnered with Caltrans, the eighteen Metropolitan Planning Organizations and hundreds of local governments in delivering the $5.6 billion Federal-aid Program.

Paul provided leadership and guidance to a professional staff responsible for strategic planning, risk-based stewardship and oversight, performance management, financial management, transportation planning, environment, right-of-way, design, construction, civil rights, safety, operations, ITS, structures, asset management, local programs, and contract administration.`,
    achievements: `Within the Division, Paul established an annual Strategic Planning Process that resulted in all levels of the Division identifying and completing actions that consistently and effectively contributed to achieving Division and FHWA corporate goals and objectives. Also, he led the development of a Caltrans' Local Program risk-based oversight process that results in Caltrans identifying improvements to procedures manuals and policies, and training needs, and leads to the implementation of innovative processes and technologies throughout the State.

During his tenure, Paul worked closely with Caltrans Executive Leadership to resolve high-profile issues related to Tunnel Critical Findings, Right-of-Way Acquisition, Bridge Load Ratings, Truck Size and Weight, Financial Management and Local Programs.`,
    categories: ['strategy', 'operations'],
  },
  {
    id: 36,
    name: `Mark Geib, P.E.`,
    photo: `/images/team/mark.webp`,
    role: `Operations Programs`,
    location: `Michigan`,
    phone: `+1 239-980-0382`,
    email: `mark@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/mark-geib-8136a018/`,
    background: `Mark brings more than 41 years of Transportation Industry experience. Mark has led and sponsored numerous initiatives and projects over the span of his career.`,
    achievements: `As the Division Administrator of Transportation Systems Management and Operations for MDOT, he chaired the MDOT negotiations team in the successful negotiations of a new 5 year, $1B statewide contract with the County Road Association of Michigan. The new contract addresses multiple legal, operational, financial, and administrative issues.

He also played a key role in a large team effort to realign and reorganize MDOT for Transportation Systems Management and Operations (TSMO). He chaired and sponsored MDOT's Statewide Maintenance Operations Alignment Team. This team manages MDOT's $420M annual maintenance budget, sets and prioritizes work, and manages fleet statewide.

He led the TSMO Division including Maintenance and Operations, Traffic and Safety, Intelligent Transportation Systems and Statewide Fleet and Facilities. He led an initiative to assess and consolidate one Region's Maintenance organizational structure and implemented team managed work groups increasing employee's participation in planning and decision making resulting in measurable increases in productivity and an improved culture.`,
    categories: ['operations'],
  },
  {
    id: 20,
    name: `Janine Cooper, P.E.`,
    photo: `/images/team/janine.webp`,
    role: `Asset Management`,
    location: `Michigan`,
    phone: `+1 269-823-4545`,
    email: `janine@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/janine-cooper-9aba9276/`,
    background: `Janine brings over 20 years of experience in the Transportation Industry with work in design, construction, maintenance and operations. With the Michigan Department of Transportation, Janine assisted with the development and implementation of several statewide organizational changes, including the movement to become a Transportation Systems Management and Operations (TSMO) focused organization.`,
    achievements: `In addition, she championed various other management improvements for efficiency and as Associate Region Engineer of Operations for the Southwest, she led several region support units including, Traffic Safety and Operations, Construction, Materials and Maintenance. In her capacity as the Associate Region Engineer of Operations, Janine led the region to adopt and pilot the new performance-based maintenance (PBM) program.

Working with her team, she identified assets, establish rating metrics, and defined the desired outputs for reporting. In addition, she worked with region maintenance teams to incorporate the new PBM results to improve asset functionality with proactive strategies. Janine worked with other Regions to take the PBM program statewide, created a handbook for reference in the field during the rating cycle, established a training program for the raters and sat on the steering team to oversee the progress of the program.

As a leader in innovation, Janine pushed initiatives to enhance the future of transportation, improve safety and increase efficiency. Her work in construction includes oversight of the first precast element bridge in Michigan and she led a collaborative team to develop and implement the use of a proprietary precast concrete system for the first freeway pavement repairs.

While in maintenance and operations, Janine incorporated data-driven decision making for winter operations; the development of asset management strategies, and championed the procurement, implementation and adoption of strategies for many in-house created tools, processes and techniques. Throughout the last 12 years as the Associate Region Engineer of Operations in the Southwest Region she was responsible for 130 employees, 3,000 lane miles, seven direct force maintenance facilities, a bridge and sign shop, and centralized fleet repair facility. Janine emphasized the use of performance measures and asset management to effectively manage the regions $37 million budget.`,
    categories: ['strategy'],
  },
  {
    id: 8,
    name: `April Blackburn, PMP`,
    photo: `/images/team/april.webp`,
    role: `Technology Strategy`,
    location: `Florida`,
    phone: `+1 850-228-1453`,
    email: `april@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/april-blackburn-a2104b144/`,
    background: `April has over 35 years of transportation industry experience, with over seven years at the executive level. This includes planning, implementing, and leading significant strategic initiatives at the organizational level resulting in improved agency structure/organization to deliver greater productivity, improved performance, and customer satisfaction.

April served as Chief Technology Officer, Chief of Transportation Technology, Interim Assistant Secretary of Finance and Administration, and Chief Information Officer for the Florida Department of Transportation (FDOT). In these roles, April led significant strategic initiatives.`,
    achievements: `These included a Technology Strategic plan, Enterprise Technology Governance, Enterprise Information Management, Data Governance, Information Technology (IT) and Operational Technology (OT) alignment, and innovation strategy.

After FDOT, April joined the private sector, providing consulting services and domain expertise that supported transportation agencies with their Digital Strategy and Technology Transformation needs. She worked across functional, technical, delivery, and sales teams to develop services and solutions for clients.

April is a well-tested transportation industry professional with proven leadership abilities developed from decades of experience in diverse leadership positions. April is passionate about leveraging technologies and resources to achieve an organization's mission.`,
    categories: ['technology', 'strategy'],
  },
  {
    id: 3,
    name: `Allison Black`,
    photo: `/images/team/allison-1.webp`,
    role: `Operational Change Management`,
    location: `Florida`,
    phone: `+1 850-544-3965`,
    email: `allison@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/allison-black-70868756/`,
    background: `Allison has over 17 years of experience in state government, with over 12 years focused on organizational leadership, development, and change management. This includes strategic planning, assessment, analysis, solutioning, and implementation that results in successful workforce development and support programs, business process optimization, functional organizational structures, and employee and customer satisfaction.`,
    achievements: `At the Florida Department of Transportation, Allison led major organizational initiatives, including restructuring, enhancing, and overseeing the statewide Training, Quality Management, and Policy and Process Management Programs, establishing the statewide Organizational Change Management Office, and overseeing the planning and execution of Organizational Change Management Plans for over 30 projects, both technology and non-technology, within the Department. She also played a significant role in designing, developing, and implementing the statewide Innovation, Awards and Recognition, and Leadership Development Programs.

After leaving the public sector, Allison served as an Organizational Change Management Consultant, working with functional, technical, sales, and delivery teams to procure, guide, and provide strategies and services for transportation, healthcare, regulatory, law enforcement, and educational state agencies. Allison's passion is helping organizations identify opportunities for improvement, develop implementation solutions and plans, and manage change to enhance their operations and support impacted stakeholders, both internal and external.`,
    categories: ['strategy'],
  },
  {
    id: 18,
    name: `David Rader`,
    photo: `/images/team/davidrader.webp`,
    role: `Asset Management`,
    location: `Tennessee`,
    phone: `+1 615-300-0069`,
    email: `david@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/david-rader-4873186/`,
    background: `David has spent his career creating positive change for communities through innovative solutions at all three levels of government. He has over 30 years of transportation experience.`,
    achievements: `He co-founded one of the nation's largest transportation asset maintenance service providers with the simple idea of fundamentally changing the approach and delivery model of how our nation's transportation assets were maintained. He built the company on the fundamental premise that a life-cycle asset management approach to maintaining and operating our nation's infrastructure was greatly needed.

Over 20 years the firm grew from two people into the premier performance-based asset maintenance and operations service provider in the United States with over 2,500 employees in 43 states. During his tenure, he has served in virtually every imaginable role. From traditional asset maintenance services work to providing O&M services on some of the largest PPP projects in the US, he was at the tip of the spear leading these efforts.

David was also a founding member and has served as the past President and long-term Board Member of AMOTIA, the Association for the Management and Operations of Transportation Infrastructure Assets. He has participated in a number of AASHTO and TRB committees and is a regular speaker at national meetings on asset maintenance.`,
    categories: ['strategy'],
  },
  {
    id: 5,
    name: `Amy Neidringhaus, P.E.`,
    photo: `/images/team/amyn-1.webp`,
    role: `Program Management`,
    location: `Florida`,
    phone: `+1 813-785-3779`,
    email: `amy@rawlinsic.com`,
    background: `Amy brings more than 23 years of Transportation Industry experience. She brings a unique blend of transportation design, construction inspection, permitting, and project management expertise as part of her experience in both the Florida Department of Transportation (FDOT) and the North Carolina Department of

Transportation.`,
    achievements: `Amy's FDOT experience encompasses diverse project management roles, having lead project teams on complex urban reconstruction projects totaling over $1 billion, interstate corridor widening and interchange reconstruction totaling $900 million, alternative program delivery totaling close to $11 billion that included managed lanes through downtown Tampa, Florida.

Her NCDOT career included serving as the Major Projects Engineer for the North Carolina Turnpike Authority, assisting in the development of design build packages for the $250 million Complete 540 project, linking seven municipalities in Wake County to a new roadway. As NCDOT's Wake County District Engineer, Amy's team served as the first point of contact for utilities, developers, and eleven municipalities in a county that consistently ranks as one of the fastest growing in the nation.

With Rawlins, Amy has focused her skills in assisting the Tennessee DOT with the development and implementation of a project management discipline founded on national best practices. She is mentoring TDOT staff on active projects, helping them build a strong project management foundation and instilling the project team concept as part of a matrix organization.

Amy has also been instrumental in the TDOT organization optimization initiative and in the development of an engineering training program that focuses not only on technical concepts including the magnitude and breadth of opportunities within the transportation field, but also on leadership and management concepts that add value to both the graduate engineer and TDOT.`,
    categories: ['strategy'],
  },
  {
    id: 45,
    name: `Ron Crew`,
    photo: `/images/team/ron.webp`,
    role: `Right-of-Way Operations`,
    location: `Florida`,
    phone: `+1 727-348-5136`,
    email: `ron@rawlinsic.com`,
    background: `Ron comes to us with 43 years of Right-of-Way experience at the Florida Department of Transportation (FDOT). He was a supervisor or manager for 33 of those years, administering Right-of-Way (R/W) Production, Acquisition, Relocation, Litigation Support, Management Support, and Local Agency Projects. He is intimately familiar with all aspects of R/W, from the planning phase to the disposition of surplus property.`,
    achievements: `He worked on several high-profile projects in the Tampa Bay area, including the Gateway Expressway, Tampa Bay Next, High-Speed Rail, I-4, I-75, I-275, and U.S. 19. Ron has extensive eminent domain litigation experience and as an FDOT client with full settlement authority participated in more than 1,000 mediations.

He is extremely knowledgeable of the Uniform Act requirements and securing Federal Aid. He served as the R/W Local Agency Program (LAP) Coordinator for many years. He has conducted numerous LAP training sessions, spoken at the Continuing Legal Education (CLE) seminar, and addressed the Hillsborough County Eminent Domain bar. He served as the R/W EEO Officer for several years, investigating and resolving numerous formal complaints.

Ron brings enormous experience and ability with him in many facets of Right of Way including Administration, R/W Project Management, Eminent Domain Processes, Uniform Act Administration, R/W Cost Estimating, Scheduling, and Cash Flow Analysis.`,
    categories: ['operations'],
  },
  {
    id: 10,
    name: `Ben Rawlins, P.E.`,
    photo: `/images/team/ben.webp`,
    role: `Chief A&I Strategy Officer`,
    location: `Nevada`,
    phone: `+1 775-741-1382`,
    email: `ben@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/benjamin-rawlins-690867212/`,
    background: `Ben Rawlins leads Rawlins Automation & Integration Division (RAID), helping organizations turn operational friction into practical AI, automation, integration, and software solutions. A licensed civil engineer by training, Ben has spent RIC's growth years building the systems, workflows, and technology backbone needed to scale a fast-growing consulting firm. His focus today is solutions architecture: listening to clients, identifying roadblocks across people, process, data, and systems, and designing right-sized solutions that can be built, adopted, and sustained. He works across AI strategy, low-code/no-code automation, dashboarding, integrations, and high-code AI/software pilots.`,
    achievements: `Ben helped grow Rawlins Infra Consult from startup stage to where it is today and built RAID into a technology powerhouse with three service lanes: solutions architecture, low-code/no-code automation and integration, and high-code AI/software development. He has led internal automation systems that reduce administrative drag, improve visibility, and return time otherwise lost to manual data entry, invoicing, reporting, and fragmented handoffs. He also helps clients scale without immediately adding headcount by designing workflows that create "FTEs without needing to hire." Ben's leadership blends strategy and execution: he builds teams, frames problems clearly, connects business goals to technical delivery, and keeps adoption at the center so AI becomes useful.`,
    categories: ['technology'],
  },
  {
    id: 47,
    name: `Sarah Rawlins`,
    photo: `/images/team/sarah.webp`,
    role: `Chief Culture Officer`,
    location: `Nevada`,
    phone: `+1 775-741-6492`,
    email: `sarah@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/sarah-rawlins-305584283/`,
    background: `Coming soon!`,
    achievements: `Coming soon!`,
    categories: ['operations', 'administration'],
  },
  {
    id: 35,
    name: `Lisa Marsh`,
    photo: `/images/team/lisa.webp`,
    role: `Maintenance & Operations Advisor`,
    location: `Michigan`,
    phone: `+1 269-845-1813`,
    email: `lisa@rawlinsic.com`,
    background: `Lisa has more than 36 years of transportation experience with the Michigan Department of Transportation (MDOT). She has an extensive maintenance and operations background, holding various maintenance positions throughout her career.

Her previous areas of responsibility included providing over-site of many direct force maintenance facilities, a bridge maintenance facility, a sign fabrication and installation shop, and a centralized fleet repair facility with six mobile mechanic trucks. Outsourced support included three Contract County Agencies, twenty-two Municipalities and many vendor contracts.`,
    achievements: `Her main duties included planning, budgeting, and coordinating summer and winter maintenance activities, contract administration, emergency response, and approving the maintenance activities on just over 3,000 lane miles of state trunk line. Additional duties included management of over 150 maintenance employees during the summer season and an additional 45 employees during the winter season.

Serving as a resource and member on several MDOT Statewide and Regional committees to research and implement innovative, cost effective, and improved ways to provide maintenance operations and services. This includes the statewide Workforce Programs and Recruitment Advisory Committee, Transportation Maintenance Worker Element Training Program Committee, Maintenance Activity Guide Review Team, Statewide Maintenance Superintendent Alignment Team, and the Southwest Region Maintenance Safety Advisory Panel.`,
    categories: ['operations'],
  },
  {
    id: 13,
    name: `Chris Petersen, CPM`,
    photo: `/images/team/chrisp.webp`,
    role: `Project Management`,
    location: `Nevada`,
    phone: `+1 775-690-0560`,
    email: `chrisp@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/chris-petersen-cpm-4a252443/`,
    background: `Chris brings over 36 years of transportation experience, with over 30 years at NDOT which include 17 years as a Senior Project Coordinator in the Roadway Design Division where he coordinated NDOT roadway projects with internal and external entities.`,
    achievements: `He has coordinated and designed several urban interchange and rehabilitation projects within the State of Nevada. He has also coordinated projects involving the following: structures, roundabouts, sound walls, landscaping and aesthetics, hydraulics and traffic improvements. This has given him experience coordinating other disciplines within roadway design.

Chris has coordinated projects that have utilized alternative delivery methods such as Design-Build and Construction Manager/ General Contractor. While at NDOT, he has coordinated several projects that were “NDOT Firsts”: I-580/Moana Interchange (first CMAR project), I-15/West Mesquite Interchange (first Accelerated Bridge Construction), I-11/Horizon Drive Interchange (first Diverging Diamond Interchange), and US-93 (first road construction on geo-foam fill).

He has conducted and participated in several road safety audits, project alternative and selection committees, project evaluations, and value analysis/engineering studies. Chris also has experience with Right-of-Way acquisition and utility coordination. He has completed the NDOT Leadership Academy and the State of Nevada Certified Public Manager Program.

After leaving the public sector, Chris served as a Project Manager in the private sector, where he managed City of Las Vegas roadway projects. He later served as a Quality Control Manager for several NDOT, City of Las Vegas, Clark County, City of Reno and Washoe County improvement projects.`,
    categories: ['operations'],
  },
  {
    id: 34,
    name: `Lauren LeJeune`,
    photo: `/images/team/lauren.webp`,
    role: `Administration & Contract Management`,
    location: `Florida`,
    phone: `+1 850-545-9377`,
    email: `lauren@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/lauren-lejeune-3b9a7b73/`,
    background: `Lauren has over 11 years of experience in state government, with 10 focused in transportation at the Florida Department of Transportation (FDOT). She has worked in various areas including disbursements, planning, and strategic development focusing on strategic planning, strategic objectives and action plans; developing, managing, and maintaining, programs, processes, standards, contracts, projects, and functional organizational structure; monitoring and allocating budget.

Lauren was a liaison and cross functional team member at FDOT, working on many programs and projects with other disciplines with the Strategic Development division which included planning offices, multimodal offices, and transportation technology.`,
    achievements: `Lauren served as the contract manager for the Multi-use Corridors of Regional Economic Significance (M-CORES) initiative and Technology Strategic Plan for FDOT. She has served as a resource for Executive Leadership teams for project and contract management throughout her career at FDOT.

Lauren's passion is providing a meaningful impact to organizations through collaboration, strategic objectives, and contributing to continuous improvement and growth.`,
    categories: ['operations'],
  },
  {
    id: 7,
    name: `Ann Scott`,
    photo: `/images/team/ann-1.webp`,
    role: `Administrative Analyst`,
    location: `Nevada`,
    phone: `+1 775-721-1396`,
    email: `ann@rawlinsic.com`,
    background: `Ann Scott has over 20 years of service working extensively with the State of Nevada's accounting and personnel systems. Ann's knowledge consists of budget building, analysis, job costing and AR/AP, grant and contract review, monitoring and reporting, along with personnel administration.`,
    achievements: `Throughout her career, Ann was responsible for developing and implementing policies and procedures to streamline fiscal and personnel administration, thus increasing organizational efficiency. Ann is committed to driving positive change and continuous improvement for an organization to achieve their goals.`,
    categories: ['administration'],
  },
  {
    id: 2,
    name: `Alicia McConnell, P.E.`,
    photo: `/images/team/alicia.webp`,
    role: `Aerial Technologies`,
    location: `Illinois`,
    phone: `+1 618-570-8293`,
    email: `alicia@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/alicia-mcconnell-pe-14049518/`,
    background: `Alicia McConnell brings over 15 years of transportation and technology experience to the Rawlins team. She began her career as a civil engineer designer, working on large roadway projects in both Wisconsin and Illinois. In 2018, an interest in technology led to her involvement in Unmanned Aerial Systems (UAS) and to investigate how these tools could be applied to improve transportation project workflows.`,
    achievements: `Alicia has developed and led UAS programs since 2018, including oversight of a nationwide network of pilots that performed UAS-based missions including surveying and mapping, bridge inspections, construction inspection and monitoring, disaster assessments, roof inspections, and thermal analyses.

She is a certified Part 107 UAS pilot with significant experience in bridge inspections and building sustainable UAS programs for clients. Her work with NCHRP to develop AASHTO guidelines for UAS applications for element-level bridge inspections is ongoing.`,
    categories: ['technology'],
  },
  {
    id: 52,
    name: `Steve Cook, P.E.`,
    photo: `/images/team/stevecook.webp`,
    role: `Operations Strategic Planning`,
    location: `Michigan`,
    phone: `+1 517-204-3099`,
    email: `steve@rawlinsic.com`,
    background: `Steve brings more than 40 years of Transportation Industry experience. Steve has led and sponsored numerous initiatives and projects over the span of his career.`,
    achievements: `As the Engineer of Operations and Maintenance for MDOT, he chaired the MDOT/Industry (MITA) negotiations team resulting in the refinement of specifications/standard plans/construction practices and improved collaboration/communication for process improvement. He was the lead for the development of the MDOT Connected Vehicle and Transportation Systems Management and Operations (TSMO) Implementation and Strategic Plans (based on SHRP2 CMM model) and TSMO Community of Learning, which led to a large team effort to realign and reorganize MDOT for the TSMO Division (section areas: Operations/Maintenance, ITS Program Office, Safety Programs, and Fleet/Facilities). He was the chair of the MDOT $140 million Operations Steering Committee, which provided a dedicated funding source (separate funding from the Capital Road and Bridge Infrastructure Program) for TSMO projects.

He was the lead and project manager for three Unmanned Aerial Systems (UAS) research & development projects that led the development of an NCHRP domestic scan, MDOT UAS Guidance Document and Training Manual, and the purchase of aerial data collection platforms that served various MDOT business models.

He was a lead resource to regions for design/construction/maintenance on Federal-aid bridge and ancillary structure projects. Provided statewide/national training/problem-solving for bridges/structures. Served as AASHTO co-chair on regional/national alignment teams for policy/procedure and guidance documents.

He was MDOT's voting member for both the AASHTO Committee on Transportation System Operations (CTSO) and Committee on Maintenance (MaC), was chair of the Community of Practice on Road Weather Management for CTSO, co-chaired the Bridge Technical Working Group for MaC, and served on the Steering Committee for the AASHTO Snow & Ice Cooperative Program. He developed several research problem statements/deliverables that resulted in NCHRP research projects of which he served on the technical advisory teams.`,
    categories: ['operations'],
  },
  {
    id: 44,
    name: `Renee Barone`,
    photo: `/images/team/renee.webp`,
    role: `Graphic Designer`,
    location: `Tennessee`,
    phone: `+1 775-980-5729`,
    email: `renee@rawlinsic.com`,
    background: `Renee is a professional Graphic Designer with a Bachelor's Degree in Graphic Design and Media Arts. With an eye for aesthetics and a passion for what she does, she is known for transforming ideas into visually captivating realities. Renee understands that a brand's identity is its first and last impression.`,
    achievements: `She meticulously crafts each element, from logo and color palette to typography and messaging, ensuring they resonate harmoniously and evoke the desired emotions cohesively. Her collaborative spirit and keen ability to listen allow her to truly understand the essence of the client's vision, making each design reflect their unique story with every project she works on.`,
    categories: ['communication-brand-design'],
  },
  {
    id: 9,
    name: `Barbara Davis, AICP`,
    photo: `/images/team/barbara.webp`,
    role: `Planning & Policy Advisor`,
    location: `Florida`,
    phone: `+1 407-760-3624`,
    email: `barbara@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/barbara-davis-aicp-69606b30/`,
    background: `Barbara has over 34 years of transportation planning experience working at the MPO, State, and local levels of government. She has worked on all modes of transportation projects including pedestrian, bicycle, transit, highways, and toll facilities.

She began her career working as an entry-level transportation planner for a Metropolitan Planning Organization (MPO). In this role, she was responsible for development of comprehensive plans for pedestrian and bicycle modes of transportation. She was subsequently promoted to Transportation Division Manager and became responsible for overseeing the development of all the MPO's major programs and initiatives including the Long-Range Transportation Plan, the Transportation Improvement Program, and the Unified Planning Work Program, as well as many other special projects. As the MPO's Executive Director, she reported directly to a board of 19 local elected officials and represented the MPO on the statewide MPO Advisory Council.`,
    achievements: `Barbara has nearly 15 years of experience at the Florida Department of Transportation (FDOT). During her time at FDOT, she was elevated to roles with increasingly higher responsibility within the Planning Department at Florida's Turnpike Enterprise. As Administrator of Planning Operations, she oversaw the development of the Traffic Engineering and Travel Demand Modeling activities.

She also coordinated the Planning Concept Study process with the Design department and managed the Turnpike's interchange review process. As Traffic and Revenue Studies Program Manager she oversaw the expansion of the traffic and revenue study process to become an agency-wide program that evaluated toll projects for Florida's Turnpike Enterprise, and the FDOT Districts and Central Office.

As Toll Studies and Forecasting Administrator, she reported directly to the Director of Transportation Development and supported statewide efforts to implement tolled express lanes and other tolled facilities. This included policy development, project coordination among the phases of project development, and on-going innovations in the development of toll choice forecasting tools.`,
    categories: ['operations'],
  },
  {
    id: 22,
    name: `Jenica Keller, P.E.`,
    photo: `/images/team/jenica.webp`,
    role: `Program & Project Management`,
    location: `Nevada`,
    phone: `+1 775-721-6508`,
    email: `jenica@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/jenica-keller-p-e-b57436bb/`,
    background: `Jenica has over 30 years of transportation industry experience with the Nevada Department of Transportation (NDOT), including her most recent executive role as the Assistant Director of Operations, where she focused on organizational leadership, development, and change management.`,
    achievements: `Jenica had the responsibility of approximately 200 employees as well as the operations of more than 13,500 lane miles, 500 facilities (administrative, maintenance stations, and rest areas), and a fleet of more than 2,700 units. Jenica spent 14 years in Project Management, where she managed the scope, schedule, and budget of several complex, high-profile, multi-million-dollar transportation projects, including the 13-mile, $0.5 Billion US-95NW Improvement Corridor in Las Vegas, Nevada. Jenica also spent time as a Road Designer, Specifications Writer, and Senior Materials Engineer calculating and recommending rigid and flexible pavement structural sections.

Throughout her career, Jenica has championed statewide initiatives and projects that have driven measurable performance improvements. She has a strategic approach to developing targeted initiatives, ensuring they are effectively communicated across all levels of the organization. Her leadership empowers employees to take ownership of their roles, fostering a culture of accountability that ultimately enables the department to exceed expectations in serving the public.

Jenica was chosen as the Project Manager to assist in the development of NDOT's Pioneer Program, which focuses on the delivery of Public-Private Partnership, Design-Build, and Construction Manager at Risk (CMAR) projects. This included the development and codification of new policy to accept unsolicited proposals in 2010. Then, in 2019, Jenica led the $181 Million Spaghetti Bowl Xpress project, located in Reno, Nevada, through contract award in the successful negotiation and execution of a design-build contract that originated as an Unsolicited Proposal.

A seasoned transportation industry professional, Jenica brings extensive experience in managing projects, leading diverse teams, and a commitment to continuous improvement. She is passionate about identifying opportunities for innovation, developing strategic solutions, and managing change to enhance operations while ensuring the success of the stakeholders she serves.`,
    categories: ['operations'],
  },
  {
    id: 27,
    name: `John Zuleger, P.E.`,
    photo: `/images/team/john.webp`,
    role: `Infrastructure Technologies Advisor`,
    location: `Ohio`,
    phone: `+1 513-827-2283`,
    email: `john@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/john-zuleger-pe-756bb1103/`,
    background: `John brings 13 years of experience as a leader in structural engineering design, along with rope access and UAS bridge inspection applications, to the Rawlins team. He has led projects with various agencies across the nation ranging from design and analysis to inspection and asset management.`,
    achievements: `Notable projects include ABC bridge slides, the Leo Frigo Bridge post-collapse analysis, and the Brent Spence and Hernando de Soto Bridge emergencies. John, a SPRAT Level 3 climber, developed a small rope access team and grew it into a leading nationwide program.

He incorporated the use of UAS into his inspection teams starting in 2016 and became a Part 107-certified UAS pilot in 2018. He has performed and managed hundreds of complex and post-disaster bridge inspections across the country. He is co-authoring the upcoming AASHTO guidelines for UAS applications in bridge inspections and has worked with numerous agencies to help develop rope access and UAS programs and policies.

He continues to develop next-generation tools for asset management with advanced predictive and prioritization modeling, including enhanced 3D modeling and digital twin integration.`,
    categories: ['technology'],
  },
  {
    id: 4,
    name: `Amy Causseaux, CPM`,
    photo: `/images/team/amyc-1.webp`,
    role: `Infrastructure Advisor`,
    location: `Florida`,
    phone: `+1 850-545-5077`,
    email: `amyc@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/amy-causseaux-cpm-b0b33721/`,
    background: `Amy joined Rawlins Infra Consult in 2024. Before this, she had a successful career in various roles at the Florida Department of Transportation. She began her career as a part-time employee and an intern while completing her Social Science degree. Amy has worked with multiple groups from a functional and technical perspective, developed lasting relationships that transcend the agency and extend to all levels of government and various stakeholders. The FDOT Leadership Academy recognized Amy's leadership potential, and she is a proud graduate of the State of Florida Certified Public Manager Program.`,
    achievements: `In 2018, Amy was promoted to the Statewide Interchange Coordinator. Under her leadership, many processes were codified into policies, standards, guidance, manuals, and handbooks. Amy's understanding of the agency's strategic goals and her technical expertise provided added benefit to the agency and the Federal Highway Administration (FHWA). Amy contributed to improving the agency's strategic outcomes in areas such as Access Management, Bicycle and Pedestrian Safety, and Managed Lanes. Her work in Managed Lanes progressed as her technical expertise deepened and the industry matured. She developed, implemented, and sustained a Managed Lanes Guidebook and training with her team based on lessons learned from working with other state DOTs.

From 2005 to 2018, Amy served as the Toll Finance Manager, collaborating and working with partners from the General Accounting Office, Districts, and Florida's Turnpike Enterprise. She streamlined processes while ensuring compliance with statutes and bond documentation requirements. She was a key team member in developing finance plans. She led the team responsible for Traffic Revenue reports for Toll and Public-Private Partnership (P3) projects.

Amy has served in many roles in the agency, including the Statewide Work Program and Right of Way Offices, District Planning, Transportation Disadvantaged, and Florida's Turnpike. She collaborated with team members to streamline several processes and worked directly with internal and external stakeholders on project initiation.`,
    categories: ['operations'],
  },
  {
    id: 17,
    name: `David Douglas`,
    photo: `/images/team/david.webp`,
    role: `Infrastructure Advisor`,
    location: `Florida`,
    phone: `+1 863-602-7125`,
    email: `davidd@rawlinsic.com`,
    background: `David joined Rawlins Infra Consult in 2024. Prior to this, he had a successful career in various roles at the Florida Department of Transportation. He began his career serving as a District Performance Management consultant, where he worked with various groups to develop business and strategic plans and train employees.`,
    achievements: `David received distinctions for conducting more than 8,000 classroom hours of training. He is a proud graduate of the Florida Certified Public Manager Program. In 2016, he joined Florida's Turnpike Enterprise as the Performance and Strategic Development Manager. In this role, he focused on workforce development, performance management, and employee engagement and satisfaction.

David increased the amount of training by 400% and automated the entire training program through a virtual platform. He developed innovative programs, including Learning Journeys, which provide employees with a curriculum approach to skill development. David had significant roles in designing, developing, and implementing the statewide Awards and Recognition program, the Employee Benefit Fund program, and several Leadership Development programs, including the Management Academy. David's passion is helping organizations and employees achieve success through strategic workforce development.`,
    categories: ['operations'],
  },
  {
    id: 29,
    name: `Ken Flore`,
    photo: `/images/team/ken.webp`,
    role: `Training & Curriculum Development Advisor`,
    location: `Michigan`,
    phone: `+1 989-245-3201`,
    email: `kenf@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/kenneth-flore-ab16b166/`,
    background: `Ken has worked for the State of Michigan for the past 35 years in various roles, and most currently with the Michigan Department of Transportation. As the Statewide Maintenance Program Coordinator, using best practices, he has made extensive changes to the Departments training programs for maintenance employees. Ken is also an active member with AASHTO's TC3 Training Committee.`,
    achievements: `He has extensive background in Labor Relations and Supervision with the Department of Transportation and the Michigan Department of Corrections, assisting in contract negations with the State's maintenance employee's union, abirritating contractual disputes, development of State of Michigan Departmental policies and operating procedures, and changes to Human Resources new supervisory trainings.`,
    categories: ['operations'],
  },
  {
    id: 12,
    name: `Carissa McQuiston, P.E.`,
    photo: `/images/team/carissa.webp`,
    role: `Safety Operations Advisor`,
    location: `Michigan`,
    phone: `+1 517-402-1521`,
    email: `carissa@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/carissa-mcquiston-p-e-006ab07/`,
    background: `Carissa has been the Safety Programs Manager for the Michigan Department of Transportation for just over two years; responsible for Managing and coordinating the division's program for highway safety on the state trunkline. In this position, she and her staff promote Toward Zero Deaths and focus on the Safe System Approach to eliminate fatalities and serious injuries on all Michigan roadways.`,
    achievements: `Carissa previously was the MDOT Cost and Scheduling Engineer for the Davison office and managed projects such as the I-475 Planning and Environmental Linkages Study and design and other regional projects. She was the MDOT Non-Motorized Safety Engineer and served as the central resource for pedestrian and bicyclist engineering and design; writing guidance documents, conducting research, and participating in many regional projects and reviews such as Safe Routes to School, TAP grants, etc.

She has been with MDOT for almost 10 years. Carissa spent the seven years prior at the City of Grand Rapids as Traffic Engineer/Traffic System Engineer; supervising the signal, sign, and traffic engineering staff. Carissa graduated from Michigan State University (Go Green!) with a BS and MS in civil engineering.`,
    categories: ['operations'],
  },
  {
    id: 28,
    name: `Katie Wendel`,
    photo: `/images/team/katie.webp`,
    role: `Accounting Specialist`,
    location: `Nevada`,
    phone: `+1 775-781-5132`,
    email: `katie@rawlinsic.com`,
    background: `Katie is a seasoned professional with a decade of experience in office management and administrative roles. Her expertise lies in efficiently handling day-to-day operations, streamlining processes, and ensuring organizational effectiveness. With a keen eye for detail and a proactive approach, Katie has successfully managed various administrative tasks, including scheduling and resource allocation. Her dedication to optimizing workflows has consistently contributed to the smooth functioning of her workplaces.

Outside of her professional endeavors, Katie finds true joy in her role as a wife and mother. She cherishes spending quality time with her husband and two children. Driven by her passion for both work and family, Katie exemplifies balance, dedication, and resilience in all aspects of her life.`,
    achievements: ``,
    categories: ['administration'],
  },
  {
    id: 21,
    name: `Jeffery Gallart`,
    photo: `/images/team/jeff.webp`,
    role: `Strategic Programs`,
    location: `Washington, D.C.`,
    phone: `+1 202-215-2809`,
    email: `jeff@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/jeffery-gallart-9baa7822/`,
    background: `Jeff has over 20 years of experience as a management consultant leading teams to solve business' most difficult challenges. Jeff is a performance improvement expert who works with transit agencies, mobility providers, and DOTs to achieve their mission at lower overall costs. His typical engagements include strategic planning, revenue generation, operational efficiency, outsourcing and cost optimization. Jeff has assisted numerous private and public sector entities with organizational structure and business process re-engineering projects aimed at enhancing long-term business performance.`,
    achievements: `Outside the mobility sector, Jeff is an expert in supply chain and logistics. He served as a logistics and operations officer in the U.S. Army for almost a decade, serving two tours in Iraq. Prior to joining RIC, Jeff worked for Teneo, Booz Allen Hamilton, PwC, and KPMG in management consulting leadership positions. Most recently he was the CEO of a safety and efficiency business that provided maintenance solutions for transit agencies, DOTs and municipal clients.

Jeff holds an MBA and Master of Science in finance from Northeastern University and a Bachelor of Science in environmental engineering from the United States Military Academy at West Point.`,
    categories: ['strategy'],
  },
  {
    id: 39,
    name: `Nicole Arakorpi`,
    photo: `/images/team/nicole.webp`,
    role: `Digital Strategy & Product`,
    location: `Nevada`,
    phone: `+1 775-881-8165`,
    email: `nicole@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/nicolelawley/`,
    background: `Nicole is a seasoned Web and Graphic Designer with over seven years of professional experience, specializing in creating visually compelling and user-friendly digital experiences. Her expertise spans across web design, graphic design, UI/UX design, and branding, ensuring each project is both aesthetically pleasing and functionally robust. Nicole brings a comprehensive skill-set to the table, allowing her to create impactful digital and visual solutions for clients across various industries. In both web and graphic design, Nicole approaches each project with creativity, innovation, and attention to detail. Her goal is to not only meet but exceed client expectations, delivering solutions that elevate their brand presence and drive tangible results.`,
    achievements: `As a web designer, Nicole leverages her expertise to create responsive and user-friendly websites of all scopes. From sleek landing pages to intricate e-commerce platforms, she's had the pleasure of bringing countless digital visions to life. Nicole believes in continuous learning and staying updated with industry trends, ensuring her designs are always fresh, innovative, and aligned with best practices.

As a graphic designer, she excels in logo design, print materials, branding initiatives, and more. With a keen eye for typography, color theory, and layout design, Nicole is committed to creating designs that not only look great but also effectively communicate the essence of the brand.

Nicole's journey into the world of design began after graduating with degrees in Marketing and Business Administration/Management from the University of Nevada, Reno. Although she initially pursued a career in Human Resources in 2013, Nicole realized her true passion lay in creativity and design. In 2017 Nicole got her BA in Graphic Design & Media Arts specializing in Web Design from Southern New Hampshire University. Since then, she has been dedicated to bringing clients' creative dreams to life.`,
    categories: ['communication-brand-design', 'technology'],
  },
  {
    id: 49,
    name: `Skylar Granata`,
    photo: `/images/team/skylar.webp`,
    role: `Accounting Specialist`,
    location: `Nevada`,
    phone: `+1 775-220-2720`,
    email: `skylar@rawlinsic.com`,
    background: `With eight years of experience in administration and accounting, Skylar has established a successful career serving the State of Nevada and the City of Reno. At the Secretary of State's Office, she gained expertise in processing notary and apostille applications while supporting the elections division. Her work at the Public Utilities Commission highlighted her organizational skills, as she managed all travel logistics and streamlined purchase order processes to improve efficiency and compliance.`,
    achievements: `At the City of Reno, Skylar took on diverse responsibilities, including budget management, policy updates, and executive calendar coordination for assistant city managers. She also led the City of Reno's Sister Cities Project, fostering cultural and economic relationships.

Skylar's commitment to detail and organizational excellence has consistently driven efficiency and supported strategic goals throughout her career.`,
    categories: ['administration'],
  },
  {
    id: 50,
    name: `Stacie Hancock`,
    photo: `/images/team/stacie.webp`,
    role: `Accounting Specialist`,
    location: `Nevada`,
    phone: `+1 775-842-7171`,
    email: `stacie@rawlinsic.com`,
    background: `Stacie Hancock brings 30+ years of experience working with the State of Nevada. She has extensive experience in fiscal monitoring, analyzing state and federal regulations, as well as managing projections, grants, and contracts. Stacie is highly skilled in accounts payable and receivables and has worked closely with program staff to ensure accurate and timely reconciliations for federal reporting. Stacie is a team player, helps train other staff and is dedicated to her work.`,
    achievements: ``,
    categories: ['administration'],
  },
  {
    id: 19,
    name: `Debbie Cmar`,
    photo: `/images/team/debbie.webp`,
    role: `Professional Services`,
    location: `Florida`,
    phone: `+1 813-230-7872`,
    email: `debbie@rawlinsic.com`,
    background: `Debbie brings 35 years of government procurement experience working in the Transportation, Professional Engineering Services, and Defense contracting industries. She has a comprehensive understanding and working knowledge of the government procurement process and life cycle.

The past 30 years of her career have been focused on Professional Services/Brooks Act Procurement projects. Debbie is experienced at working within the auspices of complex government acquisition regulations and brings working proficiency of the Brooks Act Procurement regulations, processes, and procedures. Debbie has cradle-to-grave contract management expertise, honed from the administration of numerous Professional Services projects for the Florida Department of Transportation (FDOT).`,
    achievements: `Her detailed knowledge of the Professional Services procurement process enabled her to assist the Tennessee Department of Transportation (TDOT) to develop best practice and standardization recommendations for their establishment of a Professional Services/Brooks Act procurement organization.

Debbie is skilled in creating, shaping, and leading the activities required for successful contract formation, execution, and management for professional services procurements. She is adept at training staff, developing proposal packages, conducting negotiation and contract awards, and monitoring contract execution for compliance with organization and acquisition policy, processes and procedures.

Debbie is an excellent communicator with extensive experience in mediating communications between all project stakeholders, internally and externally as well as across functional organization lines. She is proficient at developing and coordinating contract documentation and moderating meetings to ensure clear and consistent communication of project contract requirements, objectives, and work scope. She understands the criticality of teamwork and Client Relationships to the success of a project.

She uses her proven organizational, communications, and leadership skills to lead teams to achieve the project objectives and the Client's expectations. She is continuously focused on Client Satisfaction through contract compliant and quality performance; on-time, every time. Debbie is known for her wealth of contracting know-how and her responsiveness, flexibility, and solution-oriented outlook.`,
    categories: ['administration'],
  },
  {
    id: 38,
    name: `Mayela Sosa`,
    photo: `/images/team/mayela.webp`,
    role: `Infrastructure Advisor`,
    location: `Indiana`,
    phone: `+1 371-349-1396`,
    email: `mayela@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/mayela-sosa-596509297/`,
    background: `Mayela brings over 29 years of transportation industry experience. Most recently, Mayela was a senior executive with the Federal Highway Administration (FHWA) Office of the Directors of Field Services where she provided executive leadership support and strategic direction to leaders in the 13 FHWA Division offices in the Mid-America region with a collective federal-aid highway program of over $13 billion and approximately 300 employees. Mayela collaborated with the Mid-America Division offices and a wide variety of federal fund recipients, including state departments of transportation, metropolitan planning organizations, tribal and local governments, non-profit organizations and others, to successfully implement numerous grant programs introduced in the Infrastructure Investment and Jobs Act.  She also provided leadership and guidance to Division leaders in effectively navigating and resolving a wide range of unique operational, program and project issues.

Her distinguished career with FHWA has included assignments in Texas, California, Arizona, Hawaii, Indiana, and Washington, D.C.  She work for the Texas Department of Transportation for five years and served in the U.S. Army for four years prior to joining FHWA.`,
    achievements: `Mayela served as the acting Executive Director for FHWA for several months in late 2022. She successfully filled this top leadership position, which included managing the daily operations of the agency and its personnel, advising the FHWA Deputy Administrator and senior officials throughout the U.S. Department of Transportation on the agency's programs and priorities, providing strategic direction for advancing the Infrastructure Investment and Jobs Act, and speaking for and representing the agency at external engagements.

As the FHWA Indiana Division Administrator, Mayela was the principal FHWA representative in Indiana, responsible for a Division office with 23 multi-disciplinary employees and providing executive stewardship and oversight of the annual $1 billion federal-aid highway program, delivered in partnership with the Indiana Department of Transportation (INDOT) and other federal, state, and local officials. Mayela worked closely with INDOT leaders on many successful projects.  For example, she ensured prompt division action and helped INDOT meet important milestones for the completion of I-69 Finish Line project, including expedited review and execution of the environmental Record of Decision.

As the FHWA Hawaii Division Administrator, Mayela led a major reform initiative to address the Hawaii Department of Transportation's (HDOT) backlog in unexpended federal-aid highway funds. She conducted a comprehensive assessment, developed strategic options, and secured FHWA leadership approval for a targeted action plan. The plan included program and project reviews, new accountability measures, and a new partnership with FHWA's Central Federal Lands Highway Division. Mayela's resolve led HDOT to adopt significant reforms, set reduction goals, and improve major program and project delivery processes, resulting in a more efficient use of over $100 million in federal-aid funds and expedited project delivery of critical transportation projects.`,
    categories: ['strategy', 'operations'],
  },
  {
    id: 24,
    name: `Jenna Brady`,
    photo: `/images/team/jenna.webp`,
    role: `Infrastructure Advisor`,
    location: `Ohio`,
    phone: `+1 760-401-0416`,
    email: `jenna@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/jennabrady/`,
    background: `Jenna has over a decade of professional experience in quality management, stakeholder relations, operational excellence, business consulting, and executive-level project management. She has successfully managed multimillion-dollar initiatives, developed performance programs, and standardized operations within private and public agencies. Jenna has a strong leadership, reporting, technical writing, and documentation control background within highly regulated environments. She is skilled in ISO 9001:2015 quality auditing, compliance oversight, and process improvement.`,
    achievements: `Jenna began her career with Raba Kistner, Inc., undertaking quality improvement opportunities that developed key skills such as process improvement, auditing, and project management. In 2018, she obtained her Certified Quality Auditor (CQA) certification through the American Society for Improvement through diligence and commitment to excellence. She advanced to roles of increasing responsibility, as the lead auditor for Construction and Design-Build Infrastructure projects within Texas.

Throughout her career with Raba Kistner, she successfully managed complex continuous improvement initiatives, implemented quality and risk management solutions, and audited multiple Design-Build Infrastructure projects throughout several states. In 2020, she played a key role in leading cross-functional teams to obtain the organization's ISO 9001:2015 certification.

In 2021, she left the private sector and began her career with the Texas Department of Transportation (TxDOT), where she led major executive-level organizational initiatives. At TxDOT, she spearheaded Quality Management initiatives to streamline communication and enhance operational workflows, ensuring alignment with internal and external stakeholder needs. By developing accessible resource libraries and implementing systems to monitor progress, she empowered teams to meet evolving project requirements. Her mission is to drive meaningful improvements in customer service and organizational processes while fostering collaboration across diverse teams. Jenna is committed to supporting agency goals by leveraging her expertise in quality auditing and project management to enable efficient decision-making and impactful outcomes.`,
    categories: ['operations'],
  },
  {
    id: 43,
    name: `Paul Wheeler`,
    photo: `/images/team/paulw.webp`,
    role: `Aerial Innovation Advisor`,
    location: `Utah`,
    phone: `(801) 232-9265`,
    email: `paulw@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/pcwheeler/`,
    background: `Paul has nearly 30 years of experience and is internationally known as an Uncrewed Aircraft System (UAS) / Advanced Air Mobility (AAM) subject matter expert. He was recognized by the Commercial UAV Expo and InterDrone as one of the world's top drone visionaries. His background in aviation, surface transportation, and technology gives him a unique perspective on innovative solutions across industries. He has developed first of their kind guidance manuals on UAS and AAM and currently serves on multiple national committees to help foster innovation through emerging technologies. He is passionate about the vision to enable a new revolution of aerial innovation and transportation.`,
    achievements: ``,
    categories: ['technology'],
  },
  {
    id: 1,
    name: `Aaron Organ`,
    photo: `/images/team/aaron.webp`,
    role: `Aerial Technologies Advisor`,
    location: `Utah`,
    phone: `(480) 254-9100`,
    email: `aaron@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/aaron-organ-cm-ace/`,
    background: `Aaron Organ brings more than 15 years of aviation and transportation experience to the Rawlins team. He began his career in aircraft parts manufacturing and supporting vintage aircraft fleets before transitioning to airport operations, where he worked on training programs at airports across the United States. Aaron later moved into collegiate aviation, teaching and mentoring more than 150 students per semester, developing curricula, and preparing candidates for Federal Aviation Administration (FAA) written exams. Building on this foundation, he entered consulting and has since supported a wide range of aerial innovation projects for public- and private-sector clients worldwide. His expertise centers on implementing aerial innovation solutions.`,
    achievements: `Aaron supported the Federal Highway Administration's deployment of Uncrewed Aircraft Systems (UAS), serving as Lead Technical Writer for more than a dozen cross-disciplinary reports that required coordination across legal, regulatory, technical, and public-affairs reviews. He also served as Co-Principal Investigator and Lead Researcher for a nationally distributed guidebook designed to help state departments of transportation integrate UAS and Advanced Air Mobility (AAM) into their transportation systems.

He holds FAA Remote Pilot, Private Pilot (SEL), and Advanced Ground Instructor certifications, and is a Certified Member of the American Association of Airport Executives (AAAE) as well as an Airport Certified Employee (ACE) in Airfield Operations. His contributions to aviation education were recognized when he was named **Utah Aviation Educator of the Year** by the Utah Department of Transportation – Division of Aeronautics.`,
    categories: ['technology'],
  },
  {
    id: 33,
    name: `Lance Grace`,
    photo: `/images/team/lance.webp`,
    role: `Infrastructure Advisor`,
    location: `Florida`,
    phone: `+1 850-556-1166`,
    email: `lance@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/lance-grace-12a346388/`,
    background: `Lance has over 30 years of transportation industry experience. Most recently, Lance was the Director for the Office of Maintenance with the Florida Department of Transportation (FDOT) where he provided leadership support and strategic direction for FDOT's maintenance program area with funding that exceeded $880 million and future projections exceeding $1 billion. This included maintenance of 12,157 centerline miles, 7,152 bridges, 53 rest areas, 8 service plazas, and 4 welcome centers. His responsibilities also included the Motor Carrier Size and Weight program with 178 employees statewide that operate the scales 24/7.

His 28-year career with FDOT allowed him to serve as a Project Engineer in Bartow Construction, Assistant Resident Engineer in Fort Myers Construction, Sarasota Operations Engineer, and District 7 Maintenance Engineer (Tampa Bay Area). Prior to joining FDOT full time, Lance worked 6 consecutive summers in the FDOT soils lab starting at the age of 16. He also did materials testing for an engineering consultant on a part-time basis while obtaining his engineering education.`,
    achievements: `As the FDOT Director for the Office of Maintenance, Lance was responsible for 225 multi-disciplinary employees that supported the maintenance program. He worked closely with FDOT leadership, 7 Districts, the Florida Turnpike Enterprise, and contract industry partners to achieve key performance measures and initiatives. As the project sponsor, he led the modernization of FDOT's Maintenance Rating Program which migrated this system to cloud-based GIS system and initiated a similar project to modernize maintenance permitting systems. He was on the forefront of several priority safety initiatives including statewide guardrail assessment and repairs, striping improvements for autonomous vehicles and wet weather conditions, and the first safety summit for equipment operators. Secured funding for the first playground built at a rest area in Florida. He supported emergency response for bridge repairs which included 6 different bridges that were damaged by impacts over a 2-year period through a departmental declaration of emergency. Additionally, he supported emergency response efforts for 4 hurricanes that made landfall in Florida over the past 2 years (2023-Idalia, 2024-Debbie, Helene, and Milton). Lance is a 2024 graduate of the Florida Engineering Leadership Institute sponsored by the Florida Engineering Society.

While serving as a District Maintenance Engineer (2013 to 2023), Lance led the 3-phase implementation of a performance-based maintenance contract in Pinellas County that would ultimately outsource all maintenance activities by FDOT in this area. He also led the transition to a completely automated self-service motor pool which enhanced utilization and customer service. Expansion of a GIS-based maintenance work needs assessment to multiple field offices was also implemented under his guidance. Lance met with several local officials in the Tampa Bay area to build partnerships for supporting community needs. He led the District's emergency response operations for several storms which included Hurricane Irma.

Lance was appointed as the first Sarasota Operations Engineer for FDOT in May 2003 (2003 to 2013). He led the transition of this work unit to build a culture which would combine maintenance and construction operations to enhance efficiency and productivity. He led Sarasota Operation's emergency response efforts for several storms which included Hurricane Charley. He was recognized with an Excellence in Leadership Award in 2006.

He also served as the project manager for one of the first projects to use the Design-Build delivery method by FDOT in Central Florida for the Peace Creek Drainage Canal bridge replacement which received an Associated General Contractors award in the Design-Build Civil Category in 2001.`,
    categories: ['strategy'],
  },
  {
    id: 46,
    name: `Samantha Lloyd`,
    photo: `/images/team/saml.webp`,
    role: `AI & Automation Specialist`,
    location: `Cape Town, South Africa`,
    phone: `+27 74-723-6024`,
    email: `samantha@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/samantha-lloyd-118aa117a/`,
    background: `Samantha Lloyd is a Workflow Architect and Chief Technology Officer specializing in no-code automation, system integrations, and workflow optimization. With over four years of experience in digital transformation, she helps businesses build connected, efficient, and data-driven operations.

As the former CTO of Workiflow, Samantha directed the company's technology strategy and led development of automation frameworks that powered scalable client solutions. Recognized for excellence in workflow design and multi-platform integration across industries such as real estate, energy, and hospitality.

Samantha's approach emphasizes clarity, sustainability, and measurable outcomes – ensuring that every workflow she builds empowers teams to work smarter, not harder.`,
    achievements: `Throughout her career, Samantha has become known for her ability to blend strategic vision with technical execution. As CTO, she architected hundreds of end-to-end automation systems that reduced client workloads by as much as 70% and improved operational visibility across departments. Her leadership helped elevate Workiflow's standing as a trusted automation partner and positioned it among top-performing Monday.com consultancies.

Samantha holds multiple certifications spanning advanced workflow architecture, professional services, and developer-level expertise. She has also contributed her skills to nonprofit initiatives through the Monday.com Emergency Management Team, building efficient digital systems for humanitarian work.

Her achievements reflect a deep commitment to innovation, collaboration, and purpose-driven technology. Whether developing enterprise automation frameworks or empowering nonprofit teams, Samantha approaches every project with precision, empathy, and a belief that technology should simplify – not complicate – the way people work.`,
    categories: ['technology'],
  },
  {
    id: 6,
    name: `Andy Palanisamy`,
    photo: `/images/team/andy.webp`,
    role: `Infrastructure Advisor`,
    location: `Michigan, USA / Dubai, UAE`,
    phone: `+1 240-426-6065`,
    phone2: `+971 54-463-6822`,
    email: `andy@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/transportgooru/`,
    background: `Andy Palanisamy is a seasoned technologist and public‑policy professional with more than twenty‑five years' experience in both the public and private sectors, delivering complex projects in mobility innovation and smart‑city technologies. As a board advisor, he counsels leadership teams and clients on emerging technologies in smart cities, infrastructure and urban mobility, and he is currently developing cutting‑edge artificial‑intelligence products and services for the education sector worldwide.

Until recently Andy led the Smart Cities and Innovation practice at Parsons in Dubai, where he managed a variety of advanced technology and smart‑city projects across the Middle East and Africa. Earlier he served as Ford Motor Company's Head of Mobility Engagements for the U.S. Midwest and Canada and was the business owner of the City Insights data platform, overseeing the development and delivery of this analytics platform for cities.

Before joining Ford, Andy spent nearly fifteen years supporting federal initiatives at the U.S. Department of Transportation and NASA's Jet Propulsion Laboratory. He is recognized for his contributions to the USDOT's pioneering Intelligent Transportation Systems program and to the Federal Highway Administration's Connected Automated Vehicle research program at the Turner‑Fairbank Highway Research Center.

Andy holds a Master's degree in Public Administration from Harvard Kennedy School and a Bachelor of Civil Engineering.`,
    achievements: `Before joining Ford, Andy spent nearly fifteen years supporting various Federal initiatives at the U.S. Department of Transportation (USDOT) and the NASA Jet Propulsion Laboratory. As an industry thought leader, Andy is recognized for his contributions to the USDOT's pioneering Intelligent Transportation Systems program and various projects at the Federal Highway Administration's Connected Automated Vehicle research program at the Turner Fairbank Highway Research Center.

Andy holds a Master in Public Administration from Harvard Kennedy School and a Bachelor in Civil Engineering.Andy Palanisamy is a seasoned technologist and public policy professional with over twenty-five years of public and private sector experience, delivering complex projects in mobility innovations and smart city technologies. Andy has managed a variety of advance technology/smart city projects globally; he holds a Master in Public Administration from Harvard Kennedy School and a Bachelor in Civil Engineering.`,
    categories: ['strategy', 'technology'],
  },
  {
    id: 25,
    name: `Jennifer (Jen) Pihl`,
    photo: `/images/team/jennifer.webp`,
    role: `Infrastructure Advisor`,
    location: `Michigan`,
    phone: `+1 734-716-7356`,
    email: `jen@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/jpihl4/`,
    background: `Jennifer has more than 20 years of transportation experience working for the Michigan Department of Transportation (MDOT), Federal Highway Administration, Federal Rail Administration and Rawlins.  Jen is recognized for her ability to effectively manage and deliver transportation projects.  She has a broad range of experience from maintenance and operations to construction and traffic and safety, including intelligent transportation systems.  Jen is known for her ability to collaborate and work effectively in a team environment.`,
    achievements: `Jen has led and managed multimillion-dollar transportation projects with a high degree of technical and operational complexity. She was responsible for the MDOT University Region's Intelligent Transportation Systems (ITS) infrastructure across the full asset lifecycle, including planning, design, deployment, operations, and maintenance. In this role, she advanced Transportation Systems Management and Operations (TSMO) initiatives that improved safety, maintenance, and operational efficiency while increasing transparency and consistency in program delivery.

Working across Federal and State DOT programs, Jen developed project prioritization frameworks and benefit-cost methodologies that enabled data-driven investment decisions and led to statewide adoption of standardized project selection processes. She also supported delivery of complex software systems for MDOT's managed lanes program, including operations, training, and development of data governance, retention, and security policies. Jen provided construction oversight for technically complex projects, supporting testing, integration, and coordination with contractors to ensure projects were delivered on schedule and met operational requirements.  Her strong project management skills contributed to successful construction project delivery and the application of modeling and analytical tools to support project development.

At the Federal level, Jen led national efforts in economic development and benefit-cost analysis at the FHWA Center for Innovation and Technology, supporting freight analysis, performance management, and traffic and modeling initiatives. She provided technical assistance and training to State DOTs and MPOs, supported performance-based planning and project prioritization, and served as a technical reviewer for federal discretionary grant programs. At the Federal Railroad Administration, she supported economic analysis and administration of major rail grant programs, developing guidance and templates now used nationally to support consistent evaluation and decision-making.`,
    categories: ['operations'],
  },
  {
    id: 30,
    name: `Ken M. McEntire, PE`,
    photo: `/images/team/kenm.webp`,
    role: `Advisory Services – Highway Operations & Maintenance`,
    location: `North Carolina`,
    phone: `+1 919-247-7707`,
    email: `kenm@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/ken-mcentire-0a861644/`,
    background: `Mr. McEntire has 39 years of experience in transportation operations, having provided life cycle cost analysis for the preservation of transportation assets on numerous public and privately financed projects in the United States and Canada. He has significant expertise in program management, including maintenance program design, maintenance management systems analysis, performance standards, resource allocation, and program development.

Mr. McEntire develops performance-based asset maintenance and operations systems for highway agencies, including a highway asset operational business process that combines existing processes with performance metrics to forecast workload projections.`,
    achievements: ``,
    categories: ['operations'],
  },
  {
    id: 40,
    name: `Ozzy Bravo, P.E.`,
    photo: `/images/team/ozzy.webp`,
    role: `Infrastructure Advisor`,
    location: `Kansas`,
    phone: `+1 602-614-9853`,
    email: `ozzy@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/ozzy-b-0aab3046/`,
    background: `Ozzy Bravo's career has focused on serving as a professional civil engineer in advising, planning and design of interdisciplinary, infrastructure projects. In the last decade, he has developed core competencies in business development skills including relationship building, the management and tracking of sales leads, technical proposal writing, client engagement, leadership coaching, infrastructure legislative advocacy and client relationship management best practices.`,
    achievements: `Ozzy has been associated with national award winning projects and serves in committees & boards of ARTBA, WTS International and ACEC Missouri. He was recently recognized by ARTBA with their 2025 Guy Kelcey Planning & Design Division Award.

Ozzy is a graduate of The University of Kansas and Texas A&M University in College Station. He serves his community through involvement on the Equity, Diversity and Inclusion Committee at WTS International and the Advisory Board for The University of Kansas Civil, Environmental and Architectural Engineering.`,
    categories: ['strategy'],
  },
  {
    id: 16,
    name: `Dara Wheeler`,
    photo: `/images/team/darawheeler.webp`,
    role: `Infrastructure Advisor`,
    location: `California`,
    phone: `+1 916-768-2421`,
    email: `daraw@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/dara-wheeler-56187012/`,
    background: `Dara brings 26 years of transportation industry experience, including more than 13 years in executive leadership roles. Her career spans transportation planning, rail and mass transit, aeronautics, local assistance, research, innovation, data, and artificial intelligence. She has led enterprise programs within a department of over 22,000 employees and an $18 billion budget, driving major initiatives in AI, innovation, operational efficiency, and customer engagement.

Dara served as the nation's first Chief Data and Artificial Intelligence Officer at a state Department of Transportation and has held multiple executive roles, including Chief Innovation Officer; Chief of Research, Innovation & System Information; Chief of Rail and Mass Transportation; Chief of Aeronautics; Chief of Planning and Local Assistance; and Chief of Staff for the California Department of Transportation. She brings a strong customer‑focused approach and a collaborative leadership style to every engagement.`,
    achievements: `As the Chief Data and AI Officer for Caltrans, Dara led the creation of the department's first consolidated Data and AI program, establishing the policies, governance framework, funding strategy, organizational structure, training, and change‑management foundation needed for long‑term success. She played a central role in designing and implementing two major Generative AI proof‑of‑concept initiatives focused on Vulnerable Road User Safety and Traffic Mobility Insights.

Dara's expertise includes developing Data and AI Readiness Assessments, Implementation Roadmaps, Use Case Repositories, organizational design plans, and comprehensive Data and AI Strategic Plans. She has also driven enterprise‑wide efficiency efforts and built collaboration platforms to strengthen cross‑departmental engagement.

At the national level, Dara led an AI in Transportation peer exchange with State DOTs, the Federal Highway Administration, and academic partners to accelerate progress in AI adoption across the transportation sector.

Her work has been recognized with several prestigious honors, including the **Bimla Rhinehart Award,** Caltrans' highest non‑engineering award for innovation, and the **ITS America Hall of Fame for the Americas Award** for the Traffic Mobility Insights GenAI pilot.`,
    categories: ['technology'],
  },
  {
    id: 31,
    name: `Kiara Pienaar`,
    photo: `/images/team/kiara.webp`,
    role: `Automation Tester & Content Creator`,
    location: `Gauteng/South Africa`,
    phone: `+27 69-529-8994`,
    email: `kiara@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/kiara-pienaar-362001302/`,
    background: `I work as an Automation tester and Content Creator, focusing on developing structured, engaging digital content while insuring automation workflows run accurately and efficiently. My role involves testing systems, identifying gaps, refining processes and supporting smoother digital operations. I enjoy combing creativity with analytical thinking, making sure both the content and backend systems align and function at a high standard.`,
    achievements: `Throughout my academic and professional development, I've built a strong foundation in both creative production and structured digital systems. My studies in animation have strengthened my skills in storytelling, design principles and attention to detail. I have developed the ability to quickly understand new systems, adapt to different tools and maintain a high standard of quality in my work.`,
    categories: ['technology'],
  },
  {
    id: 14,
    name: `Corey Biddle`,
    photo: `/images/team/corey.webp`,
    role: `Infrastructure Advisor`,
    location: `Colorado`,
    phone: `+1 984-500-6277`,
    email: `corey@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/coreybiddle/`,
    background: `Corey Biddle is a seasoned industry leader with over 20 years of transportation on industry experience. known for driving growth, strengthening contractor and owner relationships, and shaping delivery strategies across North America's alternative delivery market. With a career built on winning complex design build and collaborative delivery pursuits, Corey has established a reputation on for uniting teams and elevating client engagement.

As a collaborative and people focused leader, Corey is known for fostering a “one team” culture that empowers staﬀ, strengthens morale, and enhances team performance. His leadership style blends strategic vision with practical execution, ensuring alignment between market leaders, technical experts, and executive stakeholders.`,
    achievements: `Corey's expertise includes design build contract negotiation, commercial risk management, and guiding teams through the nuances of alternative delivery procurement. He is recognized for his ability to communicate with clarity, and champion ethical, transparent, and impactful decision making.

Driven by a commitment to excellence and a passion for building strong partnerships, Corey continues to shape the future of alternative delivery across North America.`,
    categories: ['strategy'],
  },
  {
    id: 23,
    name: `Jenn Breitner`,
    photo: `/images/team/jennb.webp`,
    role: `Administrative Assistant`,
    location: `Michigan`,
    phone: `+1 231-383-3559`,
    email: `jennb@rawlinsic.com`,
    background: `Jenn has 20 years of office experience and a background in client services and administration, including managerial and financial accounting. Throughout her career, she has developed extensive skills in clerical operations, financial data entry, and account reconciliation. Her background in client relations allows her to communicate effectively, analyze requests, and provide exceptional service with precision.`,
    achievements: `She has a proven track record of analyzing financial and inventory data. Jenn is currently pursuing a degree in Business and Accounting at Baker College. She is on an accelerated track towards her bachelor's degree and plans to pursue an MBA shortly thereafter.

Jenn has two boys in the United States Army and one grandson, who are her pride and joy. She spends her free time traveling to see them and adventuring to new places. In her spare time, she enjoys searching for beach glass along the shores of Lake Michigan, hiking, and camping with family.`,
    categories: ['administration'],
  },
  {
    id: 32,
    name: `Kobus Pieters`,
    photo: `/images/team/kobus.webp`,
    role: `AI & Automation Specialist`,
    location: `Capetown, South Africa`,
    phone: `+27 83-441-8454`,
    email: `kobus@rawlinsic.com`,
    background: `Kobus is a developer and automation specialist with five years of experience across frontend, backend, and DevOps. He brings deep technical expertise to the team, building custom-coded solutions that extend and enhance automation workflows from the ground up.`,
    achievements: ``,
    categories: ['technology'],
  },
  {
    id: 26,
    name: `Joey Paskey`,
    photo: `/images/team/joey.webp`,
    role: `Infrastructure Advisor`,
    location: `Nevada`,
    phone: `+1 702-575-3472`,
    email: `joey@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/joey-paskey/`,
    background: `Joey brings over 20 years of experience in the transportation industry. She has worked extensively with state departments of transportation, regional agencies, and local governments across the United States on major infrastructure projects, with a focus on transportation systems, alternative delivery, and turning long-range plans into implementable programs.`,
    achievements: `Joey's career reflects leadership in transportation and infrastructure, spanning both public and private sectors. As Director of Public Works for the City of Las Vegas, she oversaw planning, design, construction, and maintenance of public infrastructure, with responsibility for policy, program, and budget development, including oversight of more than $950 million annually. During her tenure, she championed the City's Vision Zero initiative to eliminate traffic fatalities and serious injuries and led the implementation of asset management programs to improve maintenance efficiency and system performance.

Prior to her public sector leadership, Joey served as a consultant providing technical expertise in intelligent transportation systems (ITS), traffic design, and alternative delivery for major infrastructure projects nationwide. She is actively involved in professional organizations at the national, regional, state, and local levels. Joey is a registered Professional Engineer in Nevada and California, a certified Professional Traffic Operations Engineer (PTOE), and holds both bachelor's and master's degrees in civil engineering from Montana State University.`,
    categories: ['operations'],
  },
  {
    id: 54,
    name: `Ian Cain`,
    photo: `/images/team/ian.webp`,
    role: `VP of Finance`,
    location: `New York`,
    phone: `+1 775-250-1965`,
    email: `ian@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/ian-noller-cain/`,
    background: `Ian has 10 years of experience as a Franchisee and Financial Controller of multiple national brands. His responsibilities spanned multi–unit ownership, financial leadership, and operational scale. He specializes in building systems that support sustainable growth.`,
    achievements: `Throughout his career, Ian spent several years as a franchise owner and operator, leading performance optimization, financial strategy, and team development across multiple locations. He transitioned into senior financial leadership, partnering closely with executive teams to streamline operations, improve profitability, and support expansion initiatives.`,
    categories: ['operations'],
  },
  {
    id: 55,
    name: `Koussay Khelil`,
    photo: `/images/team/koussay.webp`,
    role: `Senior Front End Engineer`,
    location: `Ontario, Canada`,
    phone: `+1 613-601-4811`,
    email: `koussay@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/koussay-khelil/`,
    background: `Koussay Khelil is a Senior Front End Engineer with over 6 years of experience building scalable, high-performance web applications across enterprise and startup environments. He specializes in React, Next.js, TypeScript, and modern front-end architecture, with a strong focus on performance optimization, accessibility, and user experience.`,
    achievements: `Koussay has led initiatives that improved application load times, enhanced real-time analytics dashboards, and streamlined component systems for global engineering teams. Currently at Cisco, he continues to drive innovation through scalable UI development and modern web technologies.`,
    categories: ['technology'],
  },
  {
    id: 56,
    name: `Satheesh Vivekanandan`,
    photo: `/images/team/satheesh.webp`,
    role: `AI Solutions Architect`,
    location: `Dubai, United Arab Emirates`,
    phone: `+971 52 698 3930`,
    email: `satheesh@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/satheesh-vivekanandan/`,
    background: `Satheesh Vivekanandan is a Solutions Architect with over 11 years of experience helping organizations design, implement, and scale technology solutions that improve operational efficiency and business performance. His expertise spans artificial intelligence, Data, Analytics, business process automation, enterprise integrations, cloud technologies, and digital transformation initiatives.

Throughout his career, Satheesh has worked with clients across government, banking, healthcare, and enterprise sectors, leading discovery workshops, solution design, stakeholder engagement, and implementation planning for complex technology programs. He specializes in bridging the gap between business objectives and technical execution, ensuring solutions are practical, scalable, and aligned with organizational goals.

At Rawlins, Satheesh focuses on identifying opportunities to streamline operations, automate manual processes, and transform business requirements into build-ready solutions that deliver measurable results. His passion lies in leveraging emerging technologies and automation to solve real-world business challenges while creating sustainable long-term value for clients and internal teams.`,
    achievements: ``,
    categories: ['technology'],
  },
  {
    id: 57,
    name: `Rory Petersen`,
    photo: `/images/team/rory.webp`,
    role: `Administrative Assistant`,
    location: `Nevada`,
    phone: `+1 775-443-5912`,
    email: `rory@rawlinsic.com`,
    linkedin: `https://www.linkedin.com/in/rory-petersen-65a1a6149/`,
    background: `Rory Petersen is an administrative and project support professional with more than five years of experience managing client relationships, coordinating complex projects, and supporting business operations across highly regulated industries. His background includes full-cycle recruitment, account management, stakeholder engagement, business development, and operational support within the biotechnology, pharmaceutical, and life sciences sectors.

Prior to joining Rawlins Infra Consult, Rory served as a Senior Recruiting Consultant and Account Manager for Canopy Life Sciences, where he managed client engagements and recruitment projects throughout North America, Latin America, Europe, and the Asia-Pacific region. In this role, he partnered directly with executive leadership teams, hiring managers, and specialized professionals to facilitate successful project outcomes while coordinating activities across multiple countries, time zones, and business units.`,
    achievements: `Throughout his career, Rory has developed expertise in client service, project coordination, scheduling, documentation management, process improvement, and stakeholder communication. He has experience preparing reports and presentations, maintaining complex databases and tracking systems, coordinating meetings and interviews, and supporting strategic business initiatives. His ability to build strong relationships and effectively manage competing priorities has enabled him to consistently deliver high-quality results in fast-paced environments.

Prior to his work in the life sciences industry, Rory held leadership and operational roles in the golf and sports industries, where he supervised staff, coordinated events, managed customer relationships, and supported day-to-day business operations. These experiences helped establish the strong communication, organizational, and leadership skills that continue to serve him today.

Rory earned a Bachelor of Science in Psychology from William Jessup University and an Associate of Arts in General Sciences from Yuba College. He brings a collaborative, service-oriented approach to every project and is committed to supporting clients and team members through effective communication, organization, and problem-solving.`,
    categories: ['administration'],
  },
];
