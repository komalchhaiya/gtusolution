const subjectContent = {
  dbms: {
    fullName: "Database Management Systems",
    gtuSemester: "Semester 3",
    examPattern:
      "GTU DBMS papers typically mix theory (normalization, ER diagrams, SQL) with applied questions on transactions, indexing, and query optimization. Expect 2–3 mark definitions, 5–7 mark explanations, and one longer design or SQL problem.",
    keyTopics: [
      "ER modeling, relational algebra, and SQL (DDL/DML/DCL)",
      "Functional dependencies, normalization (1NF–BCNF)",
      "Transactions, ACID properties, concurrency control, and recovery",
      "Indexing (B-tree, hashing) and query processing basics",
    ],
    studyTips: [
      "Practice drawing ER diagrams from a short case study under a 15-minute timer.",
      "Write SQL for joins, subqueries, and aggregate functions without looking at notes.",
      "Revise transaction schedules and isolation levels with one solved example each.",
    ],
    sampleQuestions: [
      "Explain 2NF and 3NF with a table that violates each rule.",
      "Convert an ER diagram to relational schema and identify primary/foreign keys.",
      "Solve a query using INNER JOIN and GROUP BY on a small employee–department dataset.",
    ],
  },
  ds: {
    fullName: "Data Structures",
    gtuSemester: "Semester 3",
    examPattern:
      "Data Structure papers combine conceptual questions on complexity and abstract data types with algorithm tracing, tree/graph diagrams, and occasional code snippets in C or pseudocode.",
    keyTopics: [
      "Arrays, linked lists, stacks, and queues",
      "Trees (BST, AVL concepts), heaps, and graph representations",
      "Sorting and searching algorithms with time/space complexity",
      "Hashing, collision resolution, and recursion",
    ],
    studyTips: [
      "Trace bubble, insertion, merge, and quick sort on a fixed 8-element array.",
      "Draw BST insert/delete steps and note height changes.",
      "Memorize best/average/worst complexities in a one-page cheat sheet.",
    ],
    sampleQuestions: [
      "Insert keys 50, 30, 70, 20, 40 into a BST and show the final structure.",
      "Compare array vs linked-list implementation for stack operations.",
      "Apply Dijkstra’s algorithm on a small weighted graph given in adjacency list form.",
    ],
  },
  ic: {
    fullName: "Indian Constitution",
    gtuSemester: "Semester 3",
    examPattern:
      "Indian Constitution papers focus on articles, fundamental rights and duties, directive principles, federal structure, and landmark amendments. Answers should cite article numbers where relevant.",
    keyTopics: [
      "Preamble, salient features, and sources of the Constitution",
      "Fundamental Rights (Articles 12–35) and Fundamental Duties",
      "Directive Principles, Parliament, and federal structure",
      "Amendment procedure and important constitutional amendments",
    ],
    studyTips: [
      "Create a table mapping each Fundamental Right to its article and one landmark case.",
      "Practice 5-mark answers on DPSP vs Fundamental Rights differences.",
      "Revise emergency provisions (Articles 352, 356, 360) with brief examples.",
    ],
    sampleQuestions: [
      "Explain the Right to Equality (Articles 14–18) with two examples.",
      "Differentiate between Fundamental Rights and Directive Principles of State Policy.",
      "Describe the amendment procedure under Article 368.",
    ],
  },
  pem: {
    fullName: "Probability and Engineering Mathematics",
    gtuSemester: "Semester 4",
    examPattern:
      "PEM papers include probability distributions, statistical measures, and engineering mathematics problems. Show complete steps for expectation, variance, and distribution-based calculations.",
    keyTopics: [
      "Probability axioms, conditional probability, and Bayes’ theorem",
      "Random variables, PMF/PDF, expectation, and variance",
      "Binomial, Poisson, and normal distributions",
      "Correlation, regression, and basic statistical inference",
    ],
    studyTips: [
      "Solve five numeric problems each on Bayes’ theorem and total probability.",
      "Tabulate mean/variance formulas for standard distributions.",
      "Practice normal approximation problems with continuity correction.",
    ],
    sampleQuestions: [
      "A factory has two machines; find the probability a defective item came from machine A (Bayes).",
      "For a binomial distribution with n=10 and p=0.3, find mean and variance.",
      "Fit a straight line to a small bivariate data set using least squares.",
    ],
  },
  os: {
    fullName: "Operating Systems",
    gtuSemester: "Semester 4",
    examPattern:
      "Operating System exams test process management, scheduling, memory management, deadlocks, and file systems. Diagrams (Gantt charts, page tables) and step-by-step traces are common.",
    keyTopics: [
      "Processes, threads, CPU scheduling (FCFS, SJF, RR, priority)",
      "Process synchronization, semaphores, and deadlock handling",
      "Memory management: paging, segmentation, virtual memory",
      "File systems, disk scheduling, and protection mechanisms",
    ],
    studyTips: [
      "Solve RR and SJF scheduling on the same process set and compare waiting times.",
      "Practice banker's algorithm for deadlock avoidance with a 3×3 example.",
      "Draw page tables for logical-to-physical address translation.",
    ],
    sampleQuestions: [
      "Apply Round Robin (quantum=2) on four processes and compute average waiting time.",
      "Explain necessary conditions for deadlock and how to prevent each.",
      "Compare paging and segmentation with advantages and disadvantages.",
    ],
  },
  oops: {
    fullName: "Object-Oriented Programming",
    gtuSemester: "Semester 4",
    examPattern:
      "OOP papers cover classes, inheritance, polymorphism, abstraction, and C++/Java-style code tracing. Expect theory definitions plus small programs or output-prediction questions.",
    keyTopics: [
      "Classes, objects, constructors/destructors, and access specifiers",
      "Inheritance types, function overriding, and virtual functions",
      "Polymorphism (compile-time and runtime) and abstract classes",
      "Operator overloading, friend functions, and exception handling basics",
    ],
    studyTips: [
      "Write a small inheritance hierarchy (e.g. Shape → Circle/Rectangle) with area methods.",
      "Trace virtual vs non-virtual function calls in a 3-class example.",
      "Revise constructor order in single and multiple inheritance.",
    ],
    sampleQuestions: [
      "Explain runtime polymorphism with a short C++ example using virtual functions.",
      "Differentiate method overloading and method overriding.",
      "Predict output of a program using constructors in a base-derived chain.",
    ],
  },
  coa: {
    fullName: "Computer Organization and Architecture",
    gtuSemester: "Semester 4",
    examPattern:
      "COA papers address number systems, instruction formats, addressing modes, ALU design concepts, pipelining, and memory hierarchy. Numeric conversion and performance calculations appear regularly.",
    keyTopics: [
      "Number systems, binary arithmetic, and IEEE-754 floating point",
      "Instruction set architecture and addressing modes",
      "CPU organization, datapath, and control unit basics",
      "Pipelining hazards and memory hierarchy (cache, locality)",
    ],
    studyTips: [
      "Practice binary/hex addition and two’s complement subtraction daily.",
      "Solve CPI and execution-time problems using the classic formula.",
      "Draw a 5-stage pipeline timeline for a short instruction sequence.",
    ],
    sampleQuestions: [
      "Convert -45 decimal to 8-bit two’s complement representation.",
      "Explain five addressing modes with one example instruction each.",
      "Calculate average CPI given instruction mix and per-type cycle counts.",
    ],
  },
  ada: {
    fullName: "Analysis and Design of Algorithms",
    gtuSemester: "Semester 5",
    examPattern:
      "ADA papers require algorithm design, correctness arguments, and complexity analysis. Divide-and-conquer, greedy, dynamic programming, and graph algorithms are core areas.",
    keyTopics: [
      "Asymptotic notation and recurrence relations",
      "Divide and conquer: merge sort, quick sort, Strassen (overview)",
      "Greedy methods: activity selection, Huffman coding, MST (Kruskal/Prim)",
      "Dynamic programming and basic graph algorithms (BFS, DFS, shortest paths)",
    ],
    studyTips: [
      "Master the Master theorem for common divide-and-conquer recurrences.",
      "Solve knapsack (0/1) and LCS with a filled DP table on paper.",
      "Run Dijkstra step-by-step on a 5-node graph for exam confidence.",
    ],
    sampleQuestions: [
      "Solve T(n) = 2T(n/2) + n using the Master theorem.",
      "Apply Kruskal’s algorithm to a small weighted undirected graph.",
      "Formulate and solve 0/1 knapsack for given weights, values, and capacity.",
    ],
  },
  pe: {
    fullName: "Professional Ethics",
    gtuSemester: "Semester 5",
    examPattern:
      "Professional Ethics papers use case studies on engineering responsibility, IPR, safety, environment, and codes of conduct. Answers should balance theory with practical judgment.",
    keyTopics: [
      "Engineering ethics, moral values, and professional responsibility",
      "IPR: patents, copyrights, trademarks, and trade secrets",
      "Workplace ethics, whistleblowing, and conflict of interest",
      "Safety, risk assessment, and sustainable development",
    ],
    studyTips: [
      "Prepare 3 short case-study templates (safety, IPR, whistleblowing).",
      "Memorize key sections of the Engineers Act / code of ethics overview.",
      "Practice writing balanced conclusions: duty vs legal vs social impact.",
    ],
    sampleQuestions: [
      "Discuss engineer’s responsibility when aware of a product safety defect.",
      "Differentiate patent and copyright with IT industry examples.",
      "Analyze a conflict-of-interest scenario in a government tender.",
    ],
  },
  ajp: {
    fullName: "Advanced Java Programming",
    gtuSemester: "Semester 6",
    examPattern:
      "AJP papers cover Java collections, multithreading, JDBC, servlets/JSP or enterprise basics, and exception handling. Code snippets and API-based short answers are frequent.",
    keyTopics: [
      "Collections framework (List, Set, Map) and iterators",
      "Multithreading, synchronization, and thread lifecycle",
      "JDBC connectivity, PreparedStatement, and ResultSet handling",
      "Servlets, JSP basics, and MVC overview",
    ],
    studyTips: [
      "Write JDBC CRUD for one table including try-with-resources.",
      "Practice synchronized block vs synchronized method with output tracing.",
      "Revise HashMap vs TreeMap behavior for ordering and null keys.",
    ],
    sampleQuestions: [
      "Write a Java program using ArrayList and demonstrate iterator removal safely.",
      "Explain servlet lifecycle with a diagram.",
      "Connect to a database with JDBC and fetch rows using PreparedStatement.",
    ],
  },
  wp: {
    fullName: "Web Programming",
    gtuSemester: "Semester 6",
    examPattern:
      "Web Programming papers span HTML/CSS, JavaScript, PHP or server-side basics, forms, sessions, and simple dynamic pages. Small code fragments and output prediction are common.",
    keyTopics: [
      "HTML5 semantic elements, forms, and accessibility basics",
      "CSS layout (flexbox), selectors, and responsive design",
      "JavaScript DOM manipulation, events, and fetch/AJAX overview",
      "PHP (or similar) sessions, cookies, and form handling",
    ],
    studyTips: [
      "Build a one-page form with client-side validation in plain JavaScript.",
      "Practice CSS flexbox layouts for header–content–footer structure.",
      "Trace PHP session code: session_start, $_SESSION, destroy flow.",
    ],
    sampleQuestions: [
      "Create an HTML form with validation for email and required fields.",
      "Explain GET vs POST with examples where each is appropriate.",
      "Write JavaScript to fetch JSON from an API and display a list in the DOM.",
    ],
  },
};

export function getSubjectContent(subjectId) {
  if (!subjectId) return null;
  return subjectContent[subjectId.toLowerCase()] || null;
}

export default subjectContent;
