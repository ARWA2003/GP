import Upperbar from "../Upperbar";
import Foooter from "../footer/footer";
import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom"; // To get category from URL

const starAnimation = {
  animate: {
    y: [0, -20, 0],
    scale: [1, 1.1, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

const CourseDetail = () => {
  const { category } = useParams(); // Extract category from URL (e.g., "data-science")
  const [searchTerm, setSearchTerm] = useState("");

  // Define categories with associated courses
  const categories = [
    {
      title: "Data Science",
      courses: [
      {
          title: "Statistics and R",
          description: "An introduction to basic statistical concepts and R programming skills necessary for analyzing data in the life sciences",
          link: "https://www.edx.org/learn/r-programming/harvard-university-statistics-and-r?index=product&queryId=963635b3d6ae767615d5779d58626ffa&position=16&correlationId=62ecf2a8-e0bb-4d17-ab72-0a3ba65d36bd" 
      }, 
    {
      title: "CS50's Introduction to Databases with SQL",
      description: "An introduction to databases using a language called SQL.",
      link: "https://www.edx.org/learn/sql/harvard-university-cs50-s-introduction-to-databases-with-sql?index=product&queryId=1bb612574a93c0543f598cffbb1257a9&position=11&correlationId=950e3e31-f969-4738-b10b-fb0ed3172a21" 
    }, 
    {
      title: "Machine Learning with Python: from Linear Models to Deep Learning.",
      description: "An in-depth introduction to the field of machine learning, from linear models to deep learning and reinforcement learning, through hands-on Python projects. -- Part of the MITx MicroMasters program in Statistics and Data Science.",
      link: "https://www.edx.org/learn/machine-learning/massachusetts-institute-of-technology-machine-learning-with-python-from-linear-models-to-deep-learning?index=product&queryId=1bb612574a93c0543f598cffbb1257a9&position=12&correlationId=0f22b902-a1d8-42e0-ab9e-9f85f21f43e2" 
    }, 
    {
      title: "Data Analytics Basics for Everyone",
      description: "Learn the fundamentals of Data Analytics and gain an understanding of the data ecosystem, the process and lifecycle of data analytics, career opportunities, and the different learning paths you can take to be a Data Analyst.",
      link: "https://www.edx.org/learn/data-analysis/ibm-data-analytics-basics-for-everyone?index=product&queryId=1bb612574a93c0543f598cffbb1257a9&position=14&correlationId=b05c53be-3650-4632-9b62-0395d7105feb" 
    }, 
    {
      title: "Excel for Beginners",
      description: "Mastering a basic skills in Excel will open the door to new opportunities, jobs, and more advanced skills that can help you be more efficient in your work or advance your career in your current or a future position. Come join us and reduce barriers to working with Excel!",
      link: "https://www.edx.org/learn/excel/davidson-college-excel-for-beginners?index=product&queryId=1bb612574a93c0543f598cffbb1257a9&position=13&correlationId=75ddef8f-a073-4a65-b68c-471be1fd2d40" 
    }, 
    {
      title: "Data Science: Visualization",
      description: "Learn basic data visualization principles and how to apply them using ggplot2.",
      link: "https://www.edx.org/learn/data-visualization/harvard-university-data-science-visualization?index=product&queryId=1bb612574a93c0543f598cffbb1257a9&position=15&correlationId=269e86fb-dd00-4920-9a03-b871c9d4c4cc" 
    }, 
    {
      title: "Financial Accounting",
      description: "How do investors, creditors, and other users analyze financial statements to assess corporate performance? Learn financial accounting, how to read financial statements, and how to gather inputs to valuation models.",
      link: "https://www.edx.org/learn/financial-accounting/massachusetts-institute-of-technology-financial-accounting?index=product&queryId=1bb612574a93c0543f598cffbb1257a9&position=17&correlationId=809fa57a-99b7-49cf-a785-24a08edcaf51" 
    }, 
    {
      title: "Foundations of Modern Finance I",
      description: "A mathematically rigorous framework to understand financial markets delivered with data-driven insights from MIT professors.",
      link: "https://www.edx.org/learn/finance/massachusetts-institute-of-technology-foundations-of-modern-finance-i?index=product&queryId=1bb612574a93c0543f598cffbb1257a9&position=18&correlationId=36ba2a90-4a79-4dff-97e2-358cb6cbd2c2" 
    }, 
    {
      title: "Data Science: Probability",
      description: "Learn probability theory -- essential for a data scientist -- using a case study on the financial crisis of 2007-2008.",
      link: "https://www.edx.org/learn/probability/harvard-university-data-science-probability?index=product&queryId=1bb612574a93c0543f598cffbb1257a9&position=21&correlationId=4484528f-b5a7-4eea-b223-cffc46fec897" 
    }, 
    {
      title: "Analyzing and Visualizing Data with Power BI",
      description: "Step up your analytics game and learn one of the most in-demand job skills in the United States. Content rebooted in September 2023!",
      link: "https://www.edx.org/learn/power-bi/davidson-college-analyzing-and-visualizing-data-with-power-bi?index=product&queryId=1bb612574a93c0543f598cffbb1257a9&position=20&correlationId=18ae4060-87f4-4088-86bb-ae00b35ce81a" 
    }, 
    {
      title: "Using Python for Research",
      description: "Take your introductory knowledge of Python programming to the next level and learn how to use Python 3 for your research.",
      link: "https://www.edx.org/learn/python/harvard-university-using-python-for-research?index=product&queryId=1bb612574a93c0543f598cffbb1257a9&position=22&correlationId=79874be5-3292-4f13-9fad-4074bb55759a" 
    }, 
    {
      title: "Introduction to Cloud Computing",
      description: "Jumpstart your cloud expertise and explore offerings of AWS, Google, and IBM; delve into IaaS, PaaS, SaaS models, and cloud security. Experience IBM Cloud app deployment. Perfect for executives, students, and budding professionals.",
      link: "https://www.edx.org/learn/cloud-computing/ibm-introduction-to-cloud-computing?index=product&queryId=1bb612574a93c0543f598cffbb1257a9&position=23&correlationId=b0172ba3-b133-45a4-8a00-a51a4ea3cc07" 
    }, 
    {
      title: "Statistical Learning with Python",
      description: "Learn some of the main tools used in statistical modeling and data science. We cover both traditional as well as exciting new methods, and how to use them in Python.",
      link: "https://www.edx.org/learn/python/stanford-university-statistical-learning-with-python?index=product&queryId=1bb612574a93c0543f598cffbb1257a9&position=24&correlationId=96f99c09-7315-4082-a7f6-df8173ed8f92" 
    }, 
    {
      title: "Data Science: Machine Learning",
      description: "Build a movie recommendation system and learn the science behind one of the most popular and successful data science techniques.",
      link: "https://www.edx.org/learn/machine-learning/harvard-university-data-science-machine-learning?index=product&queryId=1bb612574a93c0543f598cffbb1257a9&position=2&correlationId=8b7514dc-8361-4429-8305-943e1167634e" 
    }, 
    {
      title: "Introduction to Data Science with Python",
      description: "Learn the concepts and techniques that make up the foundation of data science and machine learning.",
      link: "https://www.edx.org/learn/data-science/harvard-university-introduction-to-data-science-with-python?index=product&queryId=1bb612574a93c0543f598cffbb1257a9&position=3&correlationId=413992ba-7d86-4621-bcf4-0dce1873c1e5" 
    }, 

      ],
    },
    {
      title: "Business & Management",
      courses: [
        { title: "Business Management Basics", description: "Fundamentals of Business with subtitles and sign language", link: "https://example.com/business-management-basics" },
        { title: "Leadership Skills", description: "Develop leadership skills for management", link: "https://example.com/leadership-skills" },
        { title: "Remote Work Revolution for Everyone", description: "In Remote Work Revolution for Everyone, you will learn to excel in the virtual-work landscape. You will learn how to build trust, increase productivity, use digital tools intelligently, and remain fully aligned with your remote team", link: "https://www.edx.org/learn/remote-work/harvard-university-remote-work-revolution-for-everyone?index=product&queryId=6e2c428262e01f2115745caea82f74cc&position=3&correlationId=76d67dfe-baa7-425d-9a68-20fb7969ffff" }, 
        { title: "Becoming an Entrepreneur", description: "Learn the business skills and startup mindset needed to embark on your entrepreneurial path from the premier program for aspiring entrepreneurs, MIT Launch", link: "https://www.edx.org/learn/entrepreneurship/massachusetts-institute-of-technology-becoming-an-entrepreneur?index=product&queryId=102e8452dac68fbb784a07def3e0f0cc&position=4&correlationId=61f1c83f-ff5b-4311-b399-3fe4abd40ff8" },
        { title: "Creating Innovative Business Model", description: "Build your capabilities to create a value proposition, team strategy, market strategy, and financial strategy to transform your ideas into a startup company or innovative corporate venture", link: "https://www.edx.org/learn/business-model/university-system-of-maryland-creating-innovative-business-models?index=product&queryId=eded15fdaaeec2c0d72e60e560f7837d&position=15&correlationId=dbc34604-8022-4a81-89a7-58587c19ac3a" },
        { title: "Introduction to Corporate Finance", description: "Learn key financial concepts for evaluating and valuing investment opportunities, including how to value stocks and bonds", link: "https://www.edx.org/learn/corporate-finance/columbia-university-introduction-to-corporate-finance?index=product&queryId=a102d5f018947fd177e71d4c81ea7329&position=18&correlationId=9130d2d0-5750-4c10-ab2b-bcfaa8c50e40" },
        { title: "Introduction to Project Management", description: "Learn the principles of project management and apply them in your own work and life", link: "https://www.edx.org/learn/project-management/university-of-adelaide-introduction-to-project-management?index=product&queryId=f30d7e2db286b49978f3f79e2e66cdb0&position=20&correlationId=e4342c68-2ba3-47ac-8acb-49d522021c46" },
      ],
    },
    {
      title: "Computer Science",
      courses: [
        { 
          title: "Introduction to Web Accessibility", 
          description: "Get a strong foundation in digital accessibility to make your websites and apps work well for people with disabilities, meet international standards, and provide a better user experience for everyone", 
          link: "https://www.edx.org/learn/web-accessibility/the-world-wide-web-consortium-w3c-introduction-to-web-accessibility?index=product&queryId=9a64d511c9080fc62a4e86821f775785&position=13&correlationId=f1126897-6d36-45b1-b7ab-475248b33149" 
        },
        { 
          title: "C++ Programming: Basic Skills", 
          description: "Code and run your first C++ program in minutes without installing anything", 
          link: "https://www.edx.org/learn/c-programming/codio-c-programming-basic-skills?index=product&queryId=7fd504dc7b41f5a3a4b78d8ba350fd6a&position=50&correlationId=cddd8b5f-7d51-4af6-8891-0a8620b0ba0b" 
        },
        { 
          title: "HTML5 and CSS Fundamentals", 
          description: "Learn how to build websites using HTML5 and basic CSS, directly from W3C, creator of the latest Web standards.", 
          link: "https://www.edx.org/learn/css/the-world-wide-web-consortium-w3c-html5-and-css-fundamentals?index=product&queryId=c8c2189c675881feb0a9183f49b4ea32&position=81&correlationId=d236cb8a-b89e-4c57-8f9d-12e807d81ae2" 
        }
        ,
        { 
          title: "Introduction to Computer Science", 
          description: "An introduction to the intellectual enterprises of computer science and the art of programming.", 
          link: "https://www.edx.org/learn/computer-science/harvard-university-cs50-s-introduction-to-computer-science?index=product&queryId=5d6659d6c206984490785601eaa57eef&position=1&correlationId=c2ee518e-1cbd-454f-9c22-2f7a9ccb2edd" 
        },
        { 
          title: "CS50's Introduction to Programming with Python", 
          description: "An introduction to programming using Python, a popular language for general-purpose programming, data science, web programming, and more.", 
          link: "https://www.edx.org/learn/python/harvard-university-cs50-s-introduction-to-programming-with-python?index=product&queryId=5d6659d6c206984490785601eaa57eef&position=2&correlationId=7cba0d74-6f94-49fc-a0e7-59fd97902549" 
        },
        { 
          title: "CS50's Introduction to Artificial Intelligence with Python", 
          description: "Learn to use machine learning in Python in this introductory course on artificial intelligence.", 
          link: "https://www.edx.org/learn/artificial-intelligence/harvard-university-cs50-s-introduction-to-artificial-intelligence-with-python?index=product&queryId=5d6659d6c206984490785601eaa57eef&position=3&correlationId=e09b6765-cb34-4fd7-baff-8e8eca807d5a" 
        },
        { 
          title: "CS50's Introduction to Cybersecurity", 
          description: "An introduction to cybersecurity for technical and non-technical audiences alike.", 
          link: "https://www.edx.org/learn/cybersecurity/harvard-university-cs50-s-introduction-to-cybersecurity?index=product&queryId=5d6659d6c206984490785601eaa57eef&position=4&correlationId=f8cdb4ba-961a-4b0a-b4e5-d2578321ccf1" 
        },
        { 
          title: "CS50's Web Programming with Python and JavaScript", 
          description: "This course picks up where CS50 leaves off, diving more deeply into the design and implementation of web apps with Python, JavaScript, and SQL using frameworks like Django, React, and Bootstrap.", 
          link: "https://www.edx.org/learn/web-development/harvard-university-cs50-s-web-programming-with-python-and-javascript?index=product&queryId=5d6659d6c206984490785601eaa57eef&position=5&correlationId=07296f45-f97e-49c7-bc8e-1dd52b4c871e" 
        },
        { 
          title: "Data Science: Machine Learning", 
          description: "Build a movie recommendation system and learn the science behind one of the most popular and successful data science techniques.", 
          link: "https://www.edx.org/learn/machine-learning/harvard-university-data-science-machine-learning?index=product&queryId=5d6659d6c206984490785601eaa57eef&position=6&correlationId=488828c2-5948-404c-853e-9a2cd78108b3" 
        },
        { 
          title: "Introduction to Data Science with Python", 
          description: "Learn the concepts and techniques that make up the foundation of data science and machine learning.", 
          link: "https://www.edx.org/learn/data-science/harvard-university-introduction-to-data-science-with-python?index=product&queryId=5d6659d6c206984490785601eaa57eef&position=7&correlationId=7649dd4e-86d7-4ff1-8b0d-9099cec620ea" 
        },
        { 
          title: "Machine Learning and AI with Python", 
          description: "Learn how to use decision trees, the foundational algorithm for your understanding of machine learning and artificial intelligence.", 
          link: "https://www.edx.org/learn/machine-learning/harvard-university-machine-learning-and-ai-with-python?index=product&queryId=5d6659d6c206984490785601eaa57eef&position=8&correlationId=22ebcabf-cdaf-46a7-8e13-21fb04bd6a31" 
        },
        { 
          title: "Data Science: R Basics", 
          description: "Build a foundation in R and learn how to wrangle, analyze, and visualize data.", 
          link: "https://www.edx.org/learn/r-programming/harvard-university-data-science-r-basics?index=product&queryId=5d6659d6c206984490785601eaa57eef&position=9&correlationId=c75ddf9a-6878-435d-8cf6-5c4b71767a9a" 
        },
        { 
          title: "AI for Everyone: Master the Basics", 
          description: "Learn what Artificial Intelligence (AI) is by understanding its applications and key concepts including machine learning, deep learning and neural networks.", 
          link: "https://www.edx.org/learn/artificial-intelligence/ibm-ai-for-everyone-master-the-basics?index=product&queryId=5d6659d6c206984490785601eaa57eef&position=10&correlationId=52490ddf-e0a5-4e13-a3e7-2676e0dda8f9" 
        },
        { 
          title: "CS50's Introduction to Programming with Scratch", 
          description: "A gentle introduction to programming that prepares you for subsequent courses in coding.", 
          link: "https://www.edx.org/learn/scratch-programming/harvard-university-cs50-s-introduction-to-programming-with-scratch?index=product&queryId=5d6659d6c206984490785601eaa57eef&position=11&correlationId=478ae25d-85f4-4c2f-909c-bb18e6dbb999" 
        },
        { 
          title: "Python Basics for Data Science", 
          description: "This Python course provides a beginner-friendly introduction to Python for Data Science. Practice through lab exercises, and you'll be ready to create your first Python scripts on your own!", 
          link: "https://www.edx.org/learn/python/ibm-python-basics-for-data-science?index=product&queryId=5d6659d6c206984490785601eaa57eef&position=12&correlationId=c48c29cf-fb5b-4b08-9801-945b2cd5c5f2" 
        },
      ],
    },
    {
      title: "Math",
      courses: [
        { 
          title: "Introduction to Bayesian Statistics Using R", 
          description: "Learn the fundamentals of the Bayesian approach to data analysis and practice answering real-life questions using R.", 
          link: "https://www.edx.org/learn/r-programming/university-of-canterbury-introduction-to-bayesian-statistics-using-r" 
        },
        { 
          title: "Semantics of First-Order Logic", 
          description: "Explore the language of first-order logic, its applications in various disciplines, and understand its foundational concepts and limitations.", 
          link: "https://www.edx.org/learn/logic/stanford-university-semantics-of-first-order-logic" 
        },
        { 
          title: "Introduction to Probability", 
          description: "Learn probability, an essential language and set of tools for understanding data, randomness, and uncertainty", 
          link: "https://www.edx.org/learn/probability/harvard-university-introduction-to-probability?index=product&queryId=0eed7acd351ae5634a2aa4cf5b789418&position=3&correlationId=5989a397-33d8-4353-a719-c7ecbecc92a2" 
        },
        { 
          title: "Calculus Applied", 
          description: "Apply tools of single-variable calculus to create and analyze mathematical models used by real practitioners in social, life, and physical sciences", 
          link: "https://www.edx.org/learn/calculus/harvard-university-calculus-applied?index=product&queryId=7f84892ff3f8256d0faa82c28f25276f&position=2&correlationId=bfd561bb-c1cb-41f9-a70b-3d46adcc6808" 
        },
        { 
          title: "Linear Algebra - Foundations to Frontiers", 
          description: "Learn the mathematics behind linear algebra and link it to matrix software development", 
          link: "https://www.edx.org/learn/linear-algebra/the-university-of-texas-at-austin-linear-algebra-foundations-to-frontiers?index=product&queryId=f4fbc3bec3365eccef067af16bd401d9&position=13&correlationId=0e8d1fe5-f387-4d09-939b-6322a6e5b875" 
        },
        { 
          title: "Linear Algebra I: Vectors and Linear Equations", 
          description: "This course provides an overview of bachelor-level linear algebra. You will review all the concepts and practice and refresh the skills related to vectors and linear equations.", 
          link: "https://www.edx.org/learn/linear-algebra/delft-university-of-technology-linear-algebra-i-vectors-and-linear-equations?index=product&queryId=5b82fac3a8faa322094575ded5ae94f9&position=28&correlationId=64c9017f-74bb-4822-8217-88ae54b13f54" 
        }
        ,
        { 
          title: "Spreadsheets and Statistics", 
          description: "Bridge the gap between what you know and the skills you need to ensure your success and efficiency in an office setting. This course is ideal for learners who are just starting out in their professional careers, those looking to add some hard skills to their soft skills, or those looking to make the leap from contractor to full-time employee.", 
          link: "https://www.edx.org/learn/statistics/edx-intro-course-spreadsheets-and-statistics?index=product&queryId=5b82fac3a8faa322094575ded5ae94f9&position=29&correlationId=6b92cd8c-9a68-47fd-b0b4-8d15a9959286" 
        }
        ,
        { 
          title: "Linear Algebra II: Matrix Algebra", 
          description: "This course takes you through roughly three weeks of MATH 1554, Linear Algebra, as taught in the School of Mathematics at The Georgia Institute of Technology.", 
          link: "https://www.edx.org/learn/linear-algebra/the-georgia-institute-of-technology-linear-algebra-ii-matrix-algebra?index=product&queryId=5b82fac3a8faa322094575ded5ae94f9&position=32&correlationId=050c4ccd-0a18-4ae9-9ec8-1bbec546408b" 
        }
        ,
        { 
          title: "GeorgetownX: Mathematical and Computational Methods", 
          description: "Physicists use math all of the time in nearly everything that they work on. This course will help you understand how math is interconnected and recognize that math involves a handful of simple ideas that repeat. By the end of the course, you will be able to re-derive important formulas from basic principles or know precisely where to look them up and use them.", 
          link: "https://www.edx.org/learn/math/georgetown-university-mathematical-and-computational-methods?index=product&queryId=5b82fac3a8faa322094575ded5ae94f9&position=33&correlationId=de9c509c-726b-49db-8ac9-269baac00e97" 
        }
        ,
        { 
          title: "DoaneX: BioStatistics", 
          description: "This college-level Biostatistics course will teach you the skills required for success in future analytical studies in biology.", 
          link: "https://www.edx.org/learn/biostatistics/doane-university-biostatistics?index=product&queryId=5b82fac3a8faa322094575ded5ae94f9&position=34&correlationId=c6977f51-0bd9-4abb-93a3-135b5808b53e" 
        }
        ,
        { 
          title: " Algorithmic Design and Techniques", 
          description: "Learn how to design algorithms, solve computational problems and implement solutions efficiently.", 
          link: "https://www.edx.org/learn/algorithms/the-university-of-california-san-diego-algorithmic-design-and-techniques?index=product&queryId=5b82fac3a8faa322094575ded5ae94f9&position=41&correlationId=8eaa02da-95b5-4ed0-8b6e-d9cd647778af" 
        }
        ,
        { 
          title: "Basics of Statistical Inference and Modelling Using R", 
          description: "Learn why a statistical method works, how to implement it using R and when to apply it and where to look if the particular statistical method is not applicable in the specific situation.", 
          link: "https://www.edx.org/learn/inferential-statistics/university-of-canterbury-basics-of-statistical-inference-and-modelling-using-r?index=product&queryId=ed7d46f845a94da69cc5b5d0a7c48424&position=61&correlationId=c23cd4e7-b9f6-462e-954f-2af2b425d547" 
        }
        ,
        { 
          title: "Effective Thinking Through Mathematics", 
          description: "Learn tools of effective thinking through puzzles and mathematics in this fun and fascinating course.", 
          link: "https://www.edx.org/learn/math/the-university-of-texas-at-austin-effective-thinking-through-mathematics-2?index=product&queryId=ed7d46f845a94da69cc5b5d0a7c48424&position=59&correlationId=b8197cc7-0342-4733-ae04-882c32a75ea8" 
        }
        ,
        { 
          title: "A Gentle Introduction to Statistics", 
          description: "This course provides an introduction to basic statistical concepts. We begin by walking through a library of probability distributions – including the normal distribution, which in turn leads to the Central Limit Theorem. We then discuss elementary descriptive statistics and estimation methods.", 
          link: "https://www.edx.org/learn/statistics/the-georgia-institute-of-technology-probability-and-statistics-iii-a-gentle-introduction-to-statistics?index=product&queryId=ed7d46f845a94da69cc5b5d0a7c48424&position=54&correlationId=d7f68736-15a5-4f3c-923d-e848cc7e0836" 
        }
        ,
        { 
          title: "Mathematical Techniques for Problem Solving in Engineering and Science", 
          description: "Learn fundamental mathematical techniques from Linear Algebra and Calculus used in STEM domains, critically reflect on these through pertinent examples, and practice the concepts with the use of applets and exercises.", 
          link: "https://www.edx.org/learn/math/ku-leuven-mathematical-techniques-for-problem-solving-in-engineering-and-science?index=product&queryId=ed7d46f845a94da69cc5b5d0a7c48424&position=53&correlationId=2e0e79c6-596a-4b23-b229-b0d10bed5a83" 
        }
        
      ],
    
    },
    {
      title: "Engineering",
      courses: [
        { title: "Introduction to Engineering Design", description: "Gain a comprehensive overview of the engineering design workflow through the power of modeling and simulation.", link: "https://www.edx.org/learn/engineering/mathworks-introducing-engineering-system-design?index=product&queryId=92cbf21e49713f5af5ccea98ceefaf5f&position=2&correlationId=1f96c3c6-a8cc-4719-b767-3794735d7825" },
        { title: "MATLAB Essentials", description: "Master the essentials of data visualization, data analysis, programming, and app design interactively with MATLAB.", link: "https://www.edx.org/learn/matlab/mathworks-matlab-essentials?index=product&queryId=7cad87d007681e6ec6f4c3510dd4fa93&position=22&correlationId=f7761f14-ab70-4da1-96dd-7623c90b91e4" },
        { 
          title: "Energy Within Environmental Constraints", 
          description: "A quantitative introduction to the energy system and its environmental impacts.", 
          link: "https://www.edx.org/learn/environmental-science/harvard-university-energy-within-environmental-constraints?index=product&queryId=bdaacdbbb07cad12b93d51bfefd44173&position=17&correlationId=fd6fc02d-03f6-40c0-ab40-d59d01f502cf" 
        },
        { 
          title: "Introduction to Aeronautical Engineering", 
          description: "Come discover the fascinating world of flying through the exploration of aeronautics, aerodynamics, and flight mechanics.", 
          link: "https://www.edx.org/learn/aeronautical-engineering/delft-university-of-technology-introduction-to-aeronautical-engineering?index=product&queryId=2788a8b5c79865e50ea783903619adb6&position=16&correlationId=d41c834a-11ab-43a0-9a5c-367f55331dd9" 
        },
        { 
          title: "Circuits and Electronics 1", 
          description: "Learn techniques that are foundational to the design of microchips used in smartphones, self-driving cars, computers, and the Internet.", 
          link: "https://www.edx.org/learn/circuits/massachusetts-institute-of-technology-circuits-and-electronics-1-basic-circuit-analysis?index=product&queryId=75292919274308e16e39465a231ea387&position=5&correlationId=f2b331f8-21b4-44b9-b60b-ed6e7d288c34" 
        },
        { 
          title: "Supply Chain Analytics.", 
          description: "Master and apply the core methodologies used in supply chain analysis and modeling, including statistics, regression, optimization and probability ​- part of the MITx Supply Chain Management MicroMasters Credential.", 
          link: "https://www.edx.org/learn/supply-chain-design/massachusetts-institute-of-technology-supply-chain-analytics?index=product&queryId=57e918a97bd7cab7c5ec58aeba0033b0&position=3&correlationId=4a9b45ea-062a-4ad5-80e9-ef69e074c183" 
        },
        { 
          title: "Introduction to Blockchain and Web3", 
          description: "Build the foundational knowledge required to understand the latest developments in the Blockchain space and Web3", 
          link: "https://www.edx.org/learn/blockchain/web3-foundation-introduction-to-blockchain-and-web3?index=product&queryId=57e918a97bd7cab7c5ec58aeba0033b0&position=19&correlationId=4dc80269-9aa7-41f2-9857-aab2ea8b121f" 
        },
        { 
          title: "Introduction to Aerospace Structures and Materials", 
          description: "Explore the structural and material design of aircraft and spacecraft from the viewpoint of an aerospace engineer.", 
          link: "https://www.edx.org/learn/aeronautical-engineering/delft-university-of-technology-introduction-to-aerospace-structures-and-materials?index=product&queryId=cc76075b34c5361a12f7af257c14f826&position=28&correlationId=7f82001f-6ee6-4c99-ba9e-2d03eaeae6b5" 
        },
        { 
          title: "Climate Change: Carbon Capture and Storage", 
          description: "Explore the technology that can provide a long-term solution to protect our atmosphere from an excess of carbon dioxide, in the context of global energy, our use of fossil fuels, and climate change.", 
          link: "https://www.edx.org/learn/climate-change/the-university-of-edinburgh-climate-change-carbon-capture-and-storage?index=product&queryId=cc76075b34c5361a12f7af257c14f826&position=30&correlationId=a38d16b1-4c88-4f8a-a4e1-21b78b58d542" 
        },
        { 
          title: " Biomedical Equipment: Repairing and Maintaining Biomedical Devices", 
          description: "Understand the working of biomedical devices that are frequently used in a hospital setting. Develop the skills required to effectively maintain and troubleshoot hospital-based devices to increase their availability and usage in hospitals", 
          link: "https://www.edx.org/learn/biomedical-engineering/delft-university-of-technology-biomedical-equipment-repairing-and-maintaining-biomedical-devices?index=product&queryId=cc76075b34c5361a12f7af257c14f826&position=27&correlationId=f3dbb47b-0628-468f-897a-b49756141f2e" 
        },
        { 
          title: "GIS Foundations", 
          description: "Learn foundations of GIS concepts and geospatial technology to view, understand, query, visualize, and interpret geospatial data to reveal patterns and relationships for effective problem-solving and better decision making.", 
          link: "https://www.edx.org/learn/gis-geographic-information-systems/university-of-alaska-fairbanks-gis-foundations?index=product&queryId=cc76075b34c5361a12f7af257c14f826&position=25&correlationId=2fbb3514-4e16-4e7f-a9e5-8788dec9a518" 
        },
        { 
          title: "TUMx: Six Sigma Part 1: Define and Measure", 
          description: "An introduction to the Six Sigma methodology and the DMAIC cycle for process improvement with a focus on the Define and Measure phases, including basic statistics for understanding sampling plans and calculating process capability.", 
          link: "https://www.edx.org/learn/six-sigma/technische-universitat-munchen-six-sigma-define-and-measure?index=product&queryId=cc76075b34c5361a12f7af257c14f826&position=26&correlationId=b514acc6-246f-46c9-89c0-5a15d3213a26" 
        },
        { 
          title: "Circular Economy: An Introduction", 
          description: "Ready to make a difference? Learn how to contribute to a sustainable economic system by implementing novel business and design approaches!", 
          link: "https://www.edx.org/learn/circular-economy/delft-university-of-technology-circular-economy-an-introduction?index=product&queryId=cc76075b34c5361a12f7af257c14f826&position=35&correlationId=1dc5d677-086e-474b-815c-784e5bc1a4d8" 
        },
        { 
          title: "Agile Process, Project, and Program Controls", 
          description: "Learn Agile controls that get work done with confidence by using true transparency (actuals not estimates) and continuous improvement to ensure your people, process, and products deliver valuable, working solutions.", 
          link: "https://www.edx.org/learn/agile/the-university-of-maryland-college-park-agile-process-project-and-program-controls?index=product&queryId=cc76075b34c5361a12f7af257c14f826&position=39&correlationId=ffcc8223-2bae-486a-bc52-eaa02ab374f6" 
        },
        { 
          title: "Robotics Foundations I - Robot Modeling", 
          description: "This course explores the robotics foundations for modelling of robot manipulators.", 
          link: "https://www.edx.org/learn/robotics/universita-degli-studi-di-napoli-federico-ii-robotics-foundations-i-robot-modeling?index=product&queryId=cc76075b34c5361a12f7af257c14f826&position=38&correlationId=e8dee9d1-2ebe-4ac1-91bb-95352a1b3b73" 
        }
      ],
    },
    {
      title: "Food & Nutrition",
      courses: [
        { title: "Nutrition 101", description: "Introduction to Nutrition with subtitles and sign language", link: "https://example.com/nutrition-101" },
        { title: "Healthy Eating", description: "Learn about balanced diets", link: "https://example.com/healthy-eating" },
        { 
          title: "Mental Health and Nutrition", 
          description: "Learn what foods and nutrients should and should not be consumed to improve mental wellbeing and explore the fundamental role that nutrition plays in our mental health.", 
          link: "https://www.edx.org/learn/nutrition/university-of-canterbury-mental-health-and-nutrition?index=product&queryId=f0848d1aa36379e72a251c58a988c8cf&position=5&correlationId=569644f1-1a86-4cce-981c-70424af3cf1b" 
        },
        { 
          title: "Food for Thought: The Relationship Between Food, Gut and Brain", 
          description: "The gut and brain are very closely linked. Explore how neurology, the microbiome, and more interact to affect health.", 
          link: "https://www.edx.org/learn/food-science/eit-food-food-for-thought-the-relationship-between-food-gut-and-brain?index=product&queryId=fec2662d64af6729310ea2dffac9dd5b&position=6&correlationId=022ac45e-61a5-4147-b011-dfa9dca9d8e2" 
        },
        { 
          title: "Fundamentals of Neuroscience, Part 1: The Electrical Properties of the Neuron", 
          description: "Learn how electricity makes the neurons in your brain tick.", 
          link: "https://www.edx.org/learn/neuroscience/harvard-university-fundamentals-of-neuroscience-part-1-the-electrical-properties-of-the-neuron?index=product&queryId=d4ec96be3bec3e7a754a46ae6b33f47c&position=2&correlationId=ea0023f3-3f1e-4888-b367-98aa88f0c0c6" 
        }
        
        
      ],
    },
    {
      title: "Architecture",
      courses: [
        { 
          title: "The Architectural Imagination", 
          description: "Learn fundamental principles of architecture— as an academic subject or a professional career— by studying some of history’s most important buildings.", 
          link: "https://www.edx.org/learn/architecture/harvard-university-the-architectural-imagination?index=product&queryId=5683f0a32b20c9c223e1b49a10f150b4&position=1&correlationId=5704d598-fa47-4dce-bd8a-5f2b59b597d2" 
        },
        { 
          title: "Global Housing Design", 
          description: "Learn about the key design strategies required to develop adequate housing and inclusive dwelling environments for sustainable urban development.", 
          link: "https://www.edx.org/learn/housing/delft-university-of-technology-global-housing-design?index=product&queryId=5d3bafd9efdefe98a0c5878b2c645ff0&position=13&correlationId=d5ecfd27-2a9c-4cbb-8302-4b8e7e8e7211" 
        },
        { 
          title: "Four Facets of Contemporary Japanese Architecture", 
          description: "Learn the history, ideas, and concepts behind contemporary Japanese architecture through four architectural facets and five generations of architects.", 
          link: "https://www.edx.org/learn/architecture/the-university-of-tokyo-four-facets-of-contemporary-japanese-architecture-theory?index=product&queryId=a484c9fa8b5712128c5ec1ae410edd4c&position=16&correlationId=8714cb89-bac0-4681-956a-b0824bf332bb" 
        },
        { 
          title: "Sustainable Cities", 
          description: "Learn how government, the private sector, and other actors can support sustainable urban development", 
          link: "https://www.edx.org/learn/sustainability/sdg-academy-sustainable-cities?index=product&queryId=79482cd984f5177876d11b837c861440&position=2&correlationId=ad27dddd-6b9d-4e99-96f5-4ef31ffae7eb" 
        },
        { 
          title: "Circular Economy for a Sustainable Built Environment", 
          description: "Learn how the principles of the Circular Economy can be applied to the built environment ranging from products and buildings to metropolitan and regional development strategies.", 
          link: "https://www.edx.org/learn/circular-economy/delft-university-of-technology-circular-economy-for-a-sustainable-built-environment?index=product&queryId=79482cd984f5177876d11b837c861440&position=3&correlationId=7f2797a5-a6f0-4c07-bc5e-5d92be20db5b" 
        },
        { 
          title: "Sustainable Building with Timber", 
          description: "Innovations in architecture, engineering and manufacturing make it feasible to construct almost any building in timber, including high-rise structures. Discover how this way of building could help solve our climate, resource and housing related challenges.", 
          link: "https://www.edx.org/learn/architecture/delft-university-of-technology-building-with-timber?index=product&queryId=79482cd984f5177876d11b837c861440&position=5&correlationId=ba2540a0-25db-4760-908d-edcbc95b5875" 
        },
        { 
          title: "Urban Ecology Design", 
          description: "Learn how to contribute to a more biodiverse, nature-inclusive and sustainable built environment by using nature-based solutions in your designs and policies.", 
          link: "https://www.edx.org/learn/design/delft-university-of-technology-urban-ecology-design?index=product&queryId=79482cd984f5177876d11b837c861440&position=7&correlationId=337a0016-6ee7-40e9-94c9-ba24b5a3842a" 
        },
        { 
          title: "Sustainability in Architecture: An Interdisciplinary Introduction", 
          description: "This course introduces the basic elements and trendsthat define sustainability practices in Architecture today. Itfollows an interdisciplinary approach that includes performance assessment and urban policies.", 
          link: "https://www.edx.org/learn/architecture/universitat-politecnica-de-valencia-sustainability-in-architecture-an-interdisciplinary-introduction?index=product&queryId=79482cd984f5177876d11b837c861440&position=8&correlationId=11163a07-5b2c-4669-a577-08ae393668d7" 
        },
        { 
          title: "Sustainable Urban Development", 
          description: "Learn why cities are key in resolving global urbanization and sustainability challenges and how you can engineer tomorrow’s cities today.", 
          link: "https://www.edx.org/learn/sustainable-development/delft-university-of-technology-sustainable-urban-development?index=product&queryId=79482cd984f5177876d11b837c861440&position=9&correlationId=eacd01da-2a13-433c-aded-024838f1edbb" 
        },
        { 
          title: "Housing and Cities", 
          description: "Explore how housing defines urban identity.", 
          link: "https://www.edx.org/learn/housing/ecole-polytechnique-federale-de-lausanne-housing-and-cities?index=product&queryId=13364454f5090d2640e894e215b6c6af&position=31&correlationId=fb5b1b70-79e4-457d-8ba5-e98088134d25" 
        },
        { 
          title: "Theatre and set design", 
          description: "Study the foundamentals of scenography and set design and learn how to create a theatrical scenic perspective", 
          link: "https://www.edx.org/learn/design/universita-degli-studi-di-napoli-federico-ii-theatre-and-set-design?index=product&queryId=79482cd984f5177876d11b837c861440&position=12&correlationId=6e526f1f-e082-48ad-8bfc-dafca98322ac" 
        },
        { 
          title: "Global Housing Design", 
          description: "Learn about the key design strategies required to develop adequate housing and inclusive dwelling environments for sustainable urban development.", 
          link: "https://www.edx.org/learn/housing/delft-university-of-technology-global-housing-design?index=product&queryId=79482cd984f5177876d11b837c861440&position=13&correlationId=9b6ad308-e25b-46ed-99a1-4a973a3bb4a8" 
        },
        { 
          title: "Zero-Energy Design: an approach to make your building sustainable", 
          description: "Learn how to get to a net zero energy use of an existing building.", 
          link: "https://www.edx.org/learn/sustainable-energy/delft-university-of-technology-zero-energy-design-an-approach-to-make-your-building-sustainable?index=product&queryId=79482cd984f5177876d11b837c861440&position=14&correlationId=cef3d758-be3f-4b47-9ccd-8ca7255575ef" 
        },
        { 
          title: "Four Facets of Contemporary Japanese Architecture: Theory", 
          description: "Learn the history, ideas and concepts behind contemporary Japanese architecture through four architectural facets and five generations of architects.", 
          link: "https://www.edx.org/learn/architecture/the-university-of-tokyo-four-facets-of-contemporary-japanese-architecture-theory?index=product&queryId=79482cd984f5177876d11b837c861440&position=16&correlationId=436929a8-61e7-4ddc-bcb6-c9d0cb7d71fb" 
        },
        { 
          title: "Rethink the City: New approaches to Global and Local Urban Challenges", 
          description: "How do you plan future cities? Explore alternative theories and innovative solutions for urban challenges in the global south.", 
          link: "https://www.edx.org/learn/urban-planning/delft-university-of-technology-rethink-the-city-new-approaches-to-global-and-local-urban-challenges?index=product&queryId=79482cd984f5177876d11b837c861440&position=18&correlationId=839b3efc-63ca-431e-abcc-37e32ea4e284" 
        }
      ],
    },
    {
      title: "Law",
      courses: [
        { title: "CS50's Computer Science for Lawyers", description: "This course is a variant of Harvard University's introduction to computer science, CS50, designed especially for lawyers (and law students).", link: "https://www.edx.org/learn/computer-science/harvard-university-cs50-s-computer-science-for-lawyers?index=product&queryId=6c4bbd4623027d993c505813366056b5&position=2&correlationId=5c13528a-908b-4e49-ac2b-956c44f5d7ec" },
        { title: "U.S. Public Policy: Social, Economic, and Foreign Policies", description: "Learn about public policy in America and the dynamics of American politics.", link: "https://www.edx.org/learn/public-policy/harvard-university-u-s-public-policy-social-economic-and-foreign-policies?index=product&queryId=c16cf46ff7978e750c6c88b8d197ae76&position=4&correlationId=f621ebb9-8952-4f18-ad4c-34ff5e23e3a4" },
        { 
          title: "Contract Law: From Trust to Promise to Contract", 
          description: "Contracts are a part of our everyday life, arising in collaboration, trust, promise, and credit. How are contracts formed? What makes a contract enforceable? What happens when one party breaks a promise?", 
          link: "https://www.edx.org/learn/business-law/harvard-university-contract-law-from-trust-to-promise-to-contract?index=product&queryId=c0e36107b28bb5d4bb7e13ccd6e939ab&position=1&correlationId=8c9cbc77-4cfd-4afc-ae9e-f0af02719175" 
        },
        { 
          title: "American Government: Constitutional Foundations", 
          description: "Learn how early American politics informed the U.S. Constitution and why its promise of liberty and equality has yet to be fully realized.", 
          link: "https://www.edx.org/learn/government/harvard-university-american-government-constitutional-foundations?index=product&queryId=53ce12848fb51c2bef318ef710fe9361&position=5&correlationId=97f4c6b5-c77c-499d-ad15-729e5400d5db" 
        },
        { 
          title: "International Law", 
          description: "Learn about the Law of the International Community, including how International Law is created, applied, and upheld in today's world.", 
          link: "https://www.edx.org/learn/international-law/universite-catholique-de-louvain-international-law?index=product&queryId=a023f45c524510fa5037e56fb961899a&position=8&correlationId=c7309dae-15cc-4126-8bbf-3ed052c7aca2" 
        },
        { 
          title: "Comparative Equality & Anti-Discrimination Law", 
          description: "Explore global anti-discrimination law, comparing legal systems from the US, Europe, India, Brazil, and South Africa", 
          link: "https://www.edx.org/learn/law/stanford-university-comparative-equality-and-anti-discrimination-law"
        },
        
        {
          title: "International Anti-Corruption Legislation and Enforcement",
          description: "Learn about global anti-corruption laws, compliance, and enforcement mechanisms",
          link: "https://www.edx.org/learn/economics-finance/international-compliance-association-international-anti-corruption-legislation-and-enforcement"
        },
        
        {
          title: "Culture and Law: The East Asian Perspective",
          description: "Explore the relationship between culture and law in East Asia and its impact on society",
          link: "https://www.edx.org/learn/culture/waseda-university-culture-and-law-the-east-asian-perspective"
        },
        
        
        {
          title: "Essential Elements in Anti-Corruption",
          description: "Understand key principles and strategies in combating corruption globally",
          link: "https://www.edx.org/learn/economics-finance/international-compliance-association-essential-elements-in-anti-corruption"
        },
        
        {
          title: "Constitutional Interpretation",
          description: "Learn how legal scholars and judges interpret the U.S. Constitution and its impact on law",
          link: "https://www.edx.org/learn/law/princeton-university-constitutional-interpretation"
        },
        
        {
          title: "Intellectual Property Rights: A Management Perspective",
          description: "Explore the role of intellectual property in business strategy and innovation management",
          link: "https://www.edx.org/learn/intellectual-property/indian-institute-of-management-bangalore-intellectual-property-rights-a-management-perspective"
        },
        
        {
          title: "Structuring Business Agreements for Success",
          description: "Learn how to design and negotiate effective business agreements for long-term success",
          link: "https://www.edx.org/learn/business-administration/cornell-university-structuring-business-agreements-for-success"
        },
        
        {
          title: "JuryX: Deliberations for Social Change",
          description: "Engage in online deliberations to explore social issues and collective decision-making",
          link: "https://www.edx.org/learn/politics/harvard-university-juryx-deliberations-for-social-change"
        },
        
        {
          title: "Genomic Medicine Gets Personal",
          description: "Discover how genomics is transforming personalized medicine and healthcare",
          link: "https://www.edx.org/learn/bioinformatics/georgetown-university-genomic-medicine-gets-personal"
        },
        
        {
          title: "Preventing and Responding to Sexual Harassment and Violence",
          description: "Learn strategies to prevent and address sexual harassment and violence in various settings",
          link: "https://www.edx.org/learn/social-science/jesus-college-cambridge-preventing-and-responding-to-sexual-harassment-and-violence"
        }

        
      ],
    },
    {
      title: "Education & Teacher Training",
      courses: [
        { title: "Teacher Training 101", description: "Basics of Teaching with subtitles and sign language", link: "https://example.com/teacher-training-101" },
        { title: "Classroom Management", description: "Effective classroom strategies", link: "https://example.com/classroom-management" },
        { 
          title: "Leaders of Learning", 
          description: "Explore and understand your own theories of learning and leadership. Gain the tools to imagine and build the future of learning.", 
          link: "https://www.edx.org/learn/leadership/harvard-university-leaders-of-learning?index=product&queryId=d2ea07c9f1db16d4106bc7a008863e51&position=4&correlationId=f3731c4e-9727-49b2-9bbd-7d4bb2e055dd" 
        },
        { 
          title: "Teaching & Learning in the Diverse Classroom", 
          description: "Through real stories, reflection, and key research, learn how to create and sustain inclusive, student-centered learning environments.", 
          link: "https://www.edx.org/learn/education/cornell-university-teaching-learning-in-the-diverse-classroom?index=product&queryId=e4a68d72cf9e8c3b73b7109aa8e91c88&position=23&correlationId=9b9395af-78b4-450a-b39b-c54781915e61" 
        },
        { 
          title: "Classroom Strategies for Inquiry-Based Learning", 
          description: "Learn inquiry-based classroom practices to engage students in education through exploration.", 
          link: "https://www.edx.org/learn/teacher-training/the-university-of-texas-at-austin-classroom-strategies-for-inquiry-based-learning?index=product&queryId=1803f66820b584d9e0de51e447a75d73&position=53&correlationId=795a3f5a-c69c-4182-886a-6b973c7f712d" 
        }
        
        
        
      ],
    },
    {
      title: "Medicine",
      courses: [
        { title: "Tissue Biology", description: "Learn how cells work together to perform key body functions", link: "https://www.edx.org/learn/cellular-biology/the-university-of-queensland-tissue-biology?index=product&queryId=6bea7b3659d033a9c4511590a80ec9c8&position=290&correlationId=49795f97-a530-4ad5-b206-88d80bf5d1a6" },
        { title: "Useful Genetics Part 1: How Our Genes Shape Us", description: "Learn how genes are inherited and how they affect important personal and societal issues", link: "https://www.edx.org/learn/genetics/university-of-british-columbia-useful-genetics-part-1-how-our-genes-shape-us?index=product&queryId=f2b7894a26b6812bd2330c2a02c3b9b6&position=289&correlationId=bffeb110-cd38-4bec-b5a3-a603da20ea06" },
        { 
          title: "Principles of Biochemistry", 
          description: "This introduction to biochemistry explores the molecules of life, starting at simple building blocks and culminating in complex metabolism.", 
          link: "https://www.edx.org/learn/biochemistry/harvard-university-principles-of-biochemistry?index=product&queryId=4cf9c3da36b6fc75e76e4b95d84ec37e&position=3&correlationId=4d01ecd4-d482-4e22-ba21-df38747cc52c" 
        },
        { 
          title: "Epidemics I", 
          description: "Explore the science, prevention, and control of epidemics. This course includes lectures from leading scientists at HKU, a supplementary module on COVID-19, and panel discussions with world-leading experts in epidemics.", 
          link: "https://www.edx.org/learn/epidemics/university-of-hong-kong-epidemics-i?index=product&queryId=34593570ed7a493785cbb0b67f12793a&position=77&correlationId=ffa232b3-ed42-4882-a67e-83dbadd5beef" 
        },
        { 
          title: "Understanding Agribusiness, Value Chains, and Consumers in Global Food Systems", 
          description: "Learn about the dynamic business of food and agriculture, exploring value chain thinking and the role consumers play in our rapidly evolving food systems.", 
          link: "https://www.edx.org/learn/agribusiness/university-of-adelaide-understanding-agribusiness-value-chains-and-consumers-in-global-food-systems?index=product&queryId=aba4265d30b5a290812106e2c115626f&position=4&correlationId=11496556-e6b3-4477-95ae-031cdba2c8eb" 
        },
        { 
          title: "Introduction to Biology - The Secret of Life", 
          description: "Explore the secret of life through the basics of biochemistry, genetics, molecular biology, recombinant DNA, genomics, and rational medicine", 
          link: "https://www.edx.org/learn/biology/massachusetts-institute-of-technology-introduction-to-biology-the-secret-of-life?index=product&queryId=eadb83f78d18c569f50a577daf4552ca&position=4&correlationId=f1f7b256-ad7b-443e-b40b-da78dfd0d600"
        },
        { 
          title: "Improving Global Health: Focusing on Quality and Safety", 
          description: "n introduction to the emerging field of global healthcare quality", 
          link: "https://www.edx.org/learn/healthcare/harvard-university-improving-global-health-focusing-on-quality-and-safety?index=product&queryId=5e992fc43b9378e226c9546df6ec64eb&position=7&correlationId=ca0d0242-9901-4d19-a9fe-0021f9bde0f2"
        },
        { 
          title: "Prescription Drug Regulation, Cost, and Access: Current Controversies in Context", 
          description: "Understand how the FDA regulates pharmaceuticals and explore debates on prescription drug costs, marketing, and testing", 
          link: "https://www.edx.org/learn/drugs/harvard-university-prescription-drug-regulation-cost-and-access-current-controversies-in-context?index=product&queryId=7dc4f8054026fe2da0df6e6549790922&position=8&correlationId=e243ea64-e892-4ea0-8b16-9b6babd7d90f"
        },
        { 
          title: "Biochemistry: Biomolecules, Methods, and Mechanisms", 
          description: "Enhance your scientific thinking and data analysis skills with this in-depth adventure through biochemistry", 
          link: "https://www.edx.org/learn/biochemistry/massachusetts-institute-of-technology-biochemistry-biomolecules-methods-and-mechanisms?index=product&queryId=db441329fd7e5fcd120704f2c156a0ea&position=9&correlationId=fdac2467-78df-4466-84de-b26d95b04069"
        },
        { 
          title: "Medical Terminology", 
          description: "Medical terminology is the study of the rules of medical word building. Receive a thorough grounding in basic medical terminology through a study of root words, prefixes, and suffixes", 
          link: "https://www.edx.org/learn/medicine/doane-university-medical-terminology?index=product&queryId=7a90495ac47b122b9eed33b0d4e809b9&position=10&correlationId=8435a695-0371-4102-9ee0-64998289fecf"
        },
        { 
          title: "Genetics: The Fundamentals", 
          description: "How do we know what we know about heredity? Enhance your scientific thinking and experimental design skills with this in-depth adventure through genetics",
          link: "https://www.edx.org/learn/genetics/massachusetts-institute-of-technology-genetics-the-fundamentals?index=product&queryId=aa20a3fa6342cd15de9d8846a85cbdbf&position=11&correlationId=36c3c497-c4e8-45f4-8e8d-20760cf43f73"
        },
        { 
          title: "Introduction to Cancer Biology", 
          description: "The course will introduce the basic concepts of oncology, the basic knowledge of cancer biology, and the content of clinical oncology", 
          link: "https://www.edx.org/learn/medicine/tsinghua-university-introduction-to-cancer-biology-zhong-liu-sheng-wu-xue-gai-lun?index=product&queryId=e7999067199f0867cbfa651251c0f5b4&position=294&correlationId=57119c5d-da9a-40da-91c7-38d378cbc861"
        },
        { 
          title: "Medicinal Chemistry: The Molecular Basis of Drug Discovery", 
          description: "Gain a better understanding of the drug discovery process to learn how safe, effective drugs are developed and optimized", 
          link: "https://www.edx.org/learn/medicine/davidson-college-medicinal-chemistry-the-molecular-basis-of-drug-discovery?index=product&queryId=f4bfda08f43f50b55a9e57db6637142a&position=295&correlationId=8add270f-abe3-4973-a16c-3522d892fdce"
        },
        { 
          title: "Simulation at a Distance: Foundations of Distance Simulation", 
          description: "Master the essentials of conducting simulation-based education ‘at a distance’ (virtually) with this 8-week online course", 
          link: "https://www.edx.org/learn/education-teacher-training/mgh-institute-of-health-professions-simulation-at-a-distance-foundations-of-distance-simulation?index=product&queryId=b3b071800f848c419339d7afe982f1b9&position=296&correlationId=0a184a53-c59a-45bd-aff2-74c031952a8a"
        },
        { 
          title: "Life with Diabetes", 
          description: "Learn how to confidently manage your diabetes and live a healthy, happy life", 
          link: "https://www.edx.org/learn/diabetes/curtin-university-life-with-diabetes?index=product&queryId=4b086430845a95ba584f0420524bfc6c&position=286&correlationId=798506a0-d"
        }
        
        
        
        
      ],
    },
  ];

  // Convert URL category back to title (e.g., "data-science" to "Data Science")
  const categoryTitle = category
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Find the selected category and its courses
  const selectedCategory = categories.find((cat) => cat.title === categoryTitle);
  const courses = selectedCategory ? selectedCategory.courses : [];

  // Filter courses based on search term
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Selected Category:", selectedCategory); // Debug log
  console.log("Filtered Courses:", filteredCourses); // Debug log

  return (
    <>
      <Upperbar />
      <div className="relative min-h-screen bg-gray-100 p-6 flex flex-col items-center justify-start overflow-hidden">
        {/* Decorative Elements */}
        <motion.img
          src="/assets/puzzle.png"
          alt="Decorative Puzzle"
          variants={starAnimation}
          animate="animate"
          className="absolute w-24 top-[10%] left-[10%] opacity-50"
        />
        <motion.img
          src="/assets/puzzle.png"
          alt="Decorative Puzzle"
          variants={starAnimation}
          animate="animate"
          className="absolute w-24 top-[40%] left-[5%] opacity-50"
        />
        <motion.img
          src="/assets/puzzle.png"
          alt="Decorative Puzzle"
          variants={starAnimation}
          animate="animate"
          className="absolute w-24 top-[10%] right-[10%] opacity-50"
        />
        <motion.img
          src="/assets/puzzle.png"
          alt="Decorative Puzzle"
          variants={starAnimation}
          animate="animate"
          className="absolute w-24 top-[40%] right-[5%] opacity-50"
        />
        <motion.img
          src="/assets/puzzle.png"
          alt="Decorative Puzzle"
          variants={starAnimation}
          animate="animate"
          className="absolute w-24 bottom-[10%] left-[10%] opacity-50"
        />
        <motion.img
          src="/assets/puzzle.png"
          alt="Decorative Puzzle"
          variants={starAnimation}
          animate="animate"
          className="absolute w-24 bottom-[10%] right-[10%] opacity-50"
        />

        {/* Main Content */}
        <div className="w-full max-w-4xl mt-20 z-10">
          {/* 🔹 Header with Back Link */}
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">{categoryTitle} Courses</h1>
            <Link
              to="/courses"
              className="text-blue-500 hover:underline"
            >
              Back to Categories
            </Link>
          </div>

          {/* 🔹 Search Input */}
          <input
            type="text"
            placeholder="Search for a course"
            className="w-full p-2 border border-gray-300 rounded mb-8 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* 🔹 Courses List */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:bg-gray-100 transition"
                >
                  <h2 className="font-semibold text-gray-800">{course.title}</h2>
                  <p className="text-gray-600 text-sm mt-1">{course.description}</p>
                  <a
                    href={course.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-2 text-center bg-yellow-100 p-2 rounded hover:bg-yellow-200 transition"
                  >
                    Visit Course
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 italic">No courses found for this category.</p>
          )}
        </div>
      </div>
      <Foooter />
    </>
  );
};

export default CourseDetail;