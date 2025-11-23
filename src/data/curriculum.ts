export interface Chapter {
  id: string;
  title: string;
  description: string;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  chapters: Record<string, Chapter[]>;
}

export const CURRICULUM_DATA: Record<string, Subject> = {
  science: {
    id: 'science',
    name: 'Science',
    icon: '🔬',
    color: 'from-green-500 to-emerald-500',
    chapters: {
      '6': [
        { id: 'ch1', title: 'Food – Where Does It Come From?', description: 'Understanding food sources and ingredients' },
        { id: 'ch2', title: 'Components of Food', description: 'Nutrients, vitamins, and balanced diet' },
        { id: 'ch3', title: 'Fibre to Fabric', description: 'Plant and animal fibres, spinning and weaving' },
        { id: 'ch4', title: 'Sorting Materials Into Groups', description: 'Properties of materials and classification' },
        { id: 'ch5', title: 'Separation of Substances', description: 'Methods of separation like filtration, evaporation' },
        { id: 'ch6', title: 'Changes Around Us', description: 'Physical and chemical changes' },
        { id: 'ch7', title: 'Getting to Know Plants', description: 'Parts of plants and their functions' },
        { id: 'ch8', title: 'Body Movements', description: 'Bones, joints, and types of movements' },
        { id: 'ch9', title: 'The Living Organisms', description: 'Characteristics of living organisms' },
        { id: 'ch10', title: 'Motion and Measurement', description: 'Distance, time, and speed' },
        { id: 'ch11', title: 'Light, Shadows and Reflections', description: 'Properties of light and mirrors' },
        { id: 'ch12', title: 'Electricity and Circuits', description: 'Electric circuits and conductors' },
        { id: 'ch13', title: 'Fun With Magnets', description: 'Magnetic properties and poles' },
        { id: 'ch14', title: 'Water', description: 'Water cycle and conservation' },
        { id: 'ch15', title: 'Air Around Us', description: 'Composition and properties of air' },
        { id: 'ch16', title: 'Garbage In, Garbage Out', description: 'Waste management and recycling' }
      ],
      '7': [
        { id: 'ch1', title: 'Nutrition in Plants', description: 'Photosynthesis and modes of nutrition' },
        { id: 'ch2', title: 'Nutrition in Animals', description: 'Digestive system and nutrition' },
        { id: 'ch3', title: 'Fibre to Fabric', description: 'Wool and silk production' },
        { id: 'ch4', title: 'Heat', description: 'Temperature, conduction, and convection' },
        { id: 'ch5', title: 'Acids, Bases and Salts', description: 'Properties and indicators' },
        { id: 'ch6', title: 'Physical and Chemical Changes', description: 'Rust, crystallization, and reactions' },
        { id: 'ch7', title: 'Weather, Climate and Adaptations', description: 'Climate types and animal adaptations' },
        { id: 'ch8', title: 'Winds, Storms and Cyclones', description: 'Air pressure and weather phenomena' },
        { id: 'ch9', title: 'Soil', description: 'Soil profile, types, and conservation' },
        { id: 'ch10', title: 'Respiration in Organisms', description: 'Breathing and cellular respiration' },
        { id: 'ch11', title: 'Transportation in Animals and Plants', description: 'Circulatory system and transpiration' },
        { id: 'ch12', title: 'Reproduction in Plants', description: 'Pollination and seed dispersal' },
        { id: 'ch13', title: 'Motion and Time', description: 'Speed, velocity, and graphs' },
        { id: 'ch14', title: 'Electric Current and Its Effects', description: 'Heating and magnetic effects' },
        { id: 'ch15', title: 'Light', description: 'Reflection, refraction, and lenses' },
        { id: 'ch16', title: 'Water: A Precious Resource', description: 'Water management and conservation' },
        { id: 'ch17', title: 'Forests: Our Lifeline', description: 'Forest ecosystem and importance' },
        { id: 'ch18', title: 'Wastewater Story', description: 'Sewage treatment and water pollution' }
      ],
      '8': [
        { id: 'ch1', title: 'Crop Production and Management', description: 'Agricultural practices and tools' },
        { id: 'ch2', title: 'Microorganisms', description: 'Bacteria, viruses, and their uses' },
        { id: 'ch3', title: 'Synthetic Fibres and Plastics', description: 'Types and properties' },
        { id: 'ch4', title: 'Materials: Metals and Non-Metals', description: 'Properties and reactions' },
        { id: 'ch5', title: 'Coal and Petroleum', description: 'Fossil fuels and conservation' },
        { id: 'ch6', title: 'Combustion and Flame', description: 'Types of combustion and fire safety' },
        { id: 'ch7', title: 'Conservation of Plants and Animals', description: 'Biodiversity and endangered species' },
        { id: 'ch8', title: 'Cell Structure and Functions', description: 'Plant and animal cells' },
        { id: 'ch9', title: 'Reproduction in Animals', description: 'Sexual and asexual reproduction' },
        { id: 'ch10', title: 'Reaching the Age of Adolescence', description: 'Puberty and hormones' },
        { id: 'ch11', title: 'Force and Pressure', description: 'Types of forces and pressure' },
        { id: 'ch12', title: 'Friction', description: 'Causes and effects of friction' },
        { id: 'ch13', title: 'Sound', description: 'Production, propagation, and characteristics' },
        { id: 'ch14', title: 'Chemical Effects of Electric Current', description: 'Electroplating and conductivity' },
        { id: 'ch15', title: 'Some Natural Phenomena', description: 'Lightning and earthquakes' },
        { id: 'ch16', title: 'Light', description: 'Laws of reflection and human eye' },
        { id: 'ch17', title: 'Stars and the Solar System', description: 'Celestial objects and moon' },
        { id: 'ch18', title: 'Pollution of Air and Water', description: 'Causes and prevention' }
      ],
      '9': [
        { id: 'ch1', title: 'Matter in Our Surroundings', description: 'States of matter and properties' },
        { id: 'ch2', title: 'Is Matter Around Us Pure', description: 'Mixtures, solutions, and separation' },
        { id: 'ch3', title: 'Atoms and Molecules', description: 'Atomic structure and molecular mass' },
        { id: 'ch4', title: 'Structure of the Atom', description: 'Subatomic particles and isotopes' },
        { id: 'ch5', title: 'The Fundamental Unit of Life', description: 'Cell organelles and functions' },
        { id: 'ch6', title: 'Tissues', description: 'Plant and animal tissues' },
        { id: 'ch7', title: 'Diversity in Living Organisms', description: 'Classification of organisms' },
        { id: 'ch8', title: 'Motion', description: 'Equations of motion and graphs' },
        { id: 'ch9', title: 'Force and Laws of Motion', description: 'Newton\'s laws and momentum' },
        { id: 'ch10', title: 'Gravitation', description: 'Universal law and free fall' },
        { id: 'ch11', title: 'Work and Energy', description: 'Work done, power, and energy conservation' },
        { id: 'ch12', title: 'Sound', description: 'Wave nature and characteristics' },
        { id: 'ch13', title: 'Why Do We Fall Ill', description: 'Diseases and immune system' },
        { id: 'ch14', title: 'Natural Resources', description: 'Air, water, and soil' },
        { id: 'ch15', title: 'Improvement in Food Resources', description: 'Crop and animal husbandry' }
      ],
      '10': [
        { id: 'ch1', title: 'Chemical Reactions and Equations', description: 'Types of reactions and balancing' },
        { id: 'ch2', title: 'Acids, Bases and Salts', description: 'pH scale and neutralization' },
        { id: 'ch3', title: 'Metals and Non-metals', description: 'Reactivity series and corrosion' },
        { id: 'ch4', title: 'Carbon and Its Compounds', description: 'Organic chemistry basics' },
        { id: 'ch5', title: 'Periodic Classification of Elements', description: 'Modern periodic table' },
        { id: 'ch6', title: 'Life Processes', description: 'Nutrition, respiration, and excretion' },
        { id: 'ch7', title: 'Control and Coordination', description: 'Nervous and hormonal systems' },
        { id: 'ch8', title: 'How Do Organisms Reproduce', description: 'Reproduction methods in organisms' },
        { id: 'ch9', title: 'Heredity and Evolution', description: 'Genetics and natural selection' },
        { id: 'ch10', title: 'Light – Reflection and Refraction', description: 'Mirrors and lenses' },
        { id: 'ch11', title: 'Human Eye and Colourful World', description: 'Eye defects and dispersion' },
        { id: 'ch12', title: 'Electricity', description: 'Ohm\'s law and electric power' },
        { id: 'ch13', title: 'Magnetic Effects of Electric Current', description: 'Electromagnetism and motors' },
        { id: 'ch14', title: 'Sources of Energy', description: 'Renewable and non-renewable energy' },
        { id: 'ch15', title: 'Our Environment', description: 'Ecosystems and environmental issues' },
        { id: 'ch16', title: 'Management of Natural Resources', description: 'Sustainable development' }
      ]
    }
  },
  mathematics: {
    id: 'mathematics',
    name: 'Mathematics',
    icon: '📐',
    color: 'from-blue-500 to-indigo-500',
    chapters: {
      '6': [
        { id: 'ch1', title: 'Knowing Our Numbers', description: 'Large numbers and estimation' },
        { id: 'ch2', title: 'Whole Numbers', description: 'Properties and patterns' },
        { id: 'ch3', title: 'Playing with Numbers', description: 'Factors, multiples, and divisibility' },
        { id: 'ch4', title: 'Basic Geometrical Ideas', description: 'Points, lines, and shapes' },
        { id: 'ch5', title: 'Understanding Elementary Shapes', description: 'Angles and triangles' },
        { id: 'ch6', title: 'Integers', description: 'Positive and negative numbers' },
        { id: 'ch7', title: 'Fractions', description: 'Types and operations' },
        { id: 'ch8', title: 'Decimals', description: 'Decimal operations' },
        { id: 'ch9', title: 'Data Handling', description: 'Pictographs and bar graphs' },
        { id: 'ch10', title: 'Mensuration', description: 'Area and perimeter' },
        { id: 'ch11', title: 'Algebra', description: 'Variables and expressions' },
        { id: 'ch12', title: 'Ratio and Proportion', description: 'Comparing quantities' },
        { id: 'ch13', title: 'Symmetry', description: 'Lines of symmetry' },
        { id: 'ch14', title: 'Practical Geometry', description: 'Construction of shapes' }
      ],
      '7': [
        { id: 'ch1', title: 'Integers', description: 'Operations with integers' },
        { id: 'ch2', title: 'Fractions and Decimals', description: 'Operations and conversions' },
        { id: 'ch3', title: 'Data Handling', description: 'Mean, median, mode' },
        { id: 'ch4', title: 'Simple Equations', description: 'Solving linear equations' },
        { id: 'ch5', title: 'Lines and Angles', description: 'Types of angles' },
        { id: 'ch6', title: 'The Triangle and Its Properties', description: 'Angles and sides' },
        { id: 'ch7', title: 'Congruence of Triangles', description: 'Criteria for congruence' },
        { id: 'ch8', title: 'Comparing Quantities', description: 'Ratios and percentages' },
        { id: 'ch9', title: 'Rational Numbers', description: 'Operations with rationals' },
        { id: 'ch10', title: 'Practical Geometry', description: 'Construction of triangles' },
        { id: 'ch11', title: 'Perimeter and Area', description: 'Formulas and applications' },
        { id: 'ch12', title: 'Algebraic Expressions', description: 'Terms and operations' },
        { id: 'ch13', title: 'Exponents and Powers', description: 'Laws of exponents' },
        { id: 'ch14', title: 'Symmetry', description: 'Rotational symmetry' },
        { id: 'ch15', title: 'Visualising Solid Shapes', description: '3D objects and views' }
      ],
      '8': [
        { id: 'ch1', title: 'Rational Numbers', description: 'Properties and operations' },
        { id: 'ch2', title: 'Linear Equations in One Variable', description: 'Solving equations' },
        { id: 'ch3', title: 'Understanding Quadrilaterals', description: 'Types and properties' },
        { id: 'ch4', title: 'Practical Geometry', description: 'Construction of quadrilaterals' },
        { id: 'ch5', title: 'Data Handling', description: 'Grouped data and histograms' },
        { id: 'ch6', title: 'Squares and Square Roots', description: 'Methods and properties' },
        { id: 'ch7', title: 'Cubes and Cube Roots', description: 'Calculations' },
        { id: 'ch8', title: 'Comparing Quantities', description: 'Profit, loss, and discount' },
        { id: 'ch9', title: 'Algebraic Expressions', description: 'Multiplication and division' },
        { id: 'ch10', title: 'Visualising Solid Shapes', description: 'Views and cross-sections' },
        { id: 'ch11', title: 'Mensuration', description: 'Surface area and volume' },
        { id: 'ch12', title: 'Exponents and Powers', description: 'Laws and applications' },
        { id: 'ch13', title: 'Direct and Inverse Proportions', description: 'Variation problems' },
        { id: 'ch14', title: 'Factorisation', description: 'Methods of factorisation' },
        { id: 'ch15', title: 'Introduction to Graphs', description: 'Linear graphs' },
        { id: 'ch16', title: 'Playing with Numbers', description: 'Number patterns' }
      ],
      '9': [
        { id: 'ch1', title: 'Number Systems', description: 'Real numbers and irrational numbers' },
        { id: 'ch2', title: 'Polynomials', description: 'Types and operations' },
        { id: 'ch3', title: 'Coordinate Geometry', description: 'Cartesian plane' },
        { id: 'ch4', title: 'Linear Equations in Two Variables', description: 'Graphical solutions' },
        { id: 'ch5', title: 'Introduction to Euclid\'s Geometry', description: 'Axioms and postulates' },
        { id: 'ch6', title: 'Lines and Angles', description: 'Properties of angles' },
        { id: 'ch7', title: 'Triangles', description: 'Congruence and inequalities' },
        { id: 'ch8', title: 'Quadrilaterals', description: 'Properties and theorems' },
        { id: 'ch9', title: 'Areas of Parallelograms and Triangles', description: 'Formulas and proofs' },
        { id: 'ch10', title: 'Circles', description: 'Chords and angles' },
        { id: 'ch11', title: 'Constructions', description: 'Geometric constructions' },
        { id: 'ch12', title: 'Heron\'s Formula', description: 'Area of triangles' },
        { id: 'ch13', title: 'Surface Areas and Volumes', description: 'Formulas for 3D shapes' },
        { id: 'ch14', title: 'Statistics', description: 'Data representation' },
        { id: 'ch15', title: 'Probability', description: 'Basic probability concepts' }
      ],
      '10': [
        { id: 'ch1', title: 'Real Numbers', description: 'Euclid\'s division algorithm' },
        { id: 'ch2', title: 'Polynomials', description: 'Zeroes and relationships' },
        { id: 'ch3', title: 'Pair of Linear Equations in Two Variables', description: 'Methods of solution' },
        { id: 'ch4', title: 'Quadratic Equations', description: 'Solutions and nature of roots' },
        { id: 'ch5', title: 'Arithmetic Progressions', description: 'AP formulas' },
        { id: 'ch6', title: 'Triangles', description: 'Similarity criteria' },
        { id: 'ch7', title: 'Coordinate Geometry', description: 'Distance and section formulas' },
        { id: 'ch8', title: 'Introduction to Trigonometry', description: 'Ratios and identities' },
        { id: 'ch9', title: 'Some Applications of Trigonometry', description: 'Heights and distances' },
        { id: 'ch10', title: 'Circles', description: 'Tangents and secants' },
        { id: 'ch11', title: 'Constructions', description: 'Division and tangents' },
        { id: 'ch12', title: 'Areas Related to Circles', description: 'Sectors and segments' },
        { id: 'ch13', title: 'Surface Areas and Volumes', description: 'Combinations of solids' },
        { id: 'ch14', title: 'Statistics', description: 'Mean, median, mode for grouped data' },
        { id: 'ch15', title: 'Probability', description: 'Theoretical probability' }
      ]
    }
  },
  'social-science': {
    id: 'social-science',
    name: 'Social Science',
    icon: '🌍',
    color: 'from-orange-500 to-red-500',
    chapters: {
      '6': [
        { id: 'ch1', title: 'What, Where, How and When?', description: 'Introduction to history' },
        { id: 'ch2', title: 'On the Trail of the Earliest People', description: 'Stone Age' },
        { id: 'ch3', title: 'From Gathering to Growing Food', description: 'Agricultural revolution' },
        { id: 'ch4', title: 'In the Earliest Cities', description: 'Harappan civilization' },
        { id: 'ch5', title: 'What Books and Burials Tell Us', description: 'Vedic period' },
        { id: 'ch6', title: 'Kingdoms, Kings and an Early Republic', description: 'Ancient political systems' },
        { id: 'ch7', title: 'New Questions and Ideas', description: 'Philosophy and religion' },
        { id: 'ch8', title: 'Ashoka, The Emperor Who Gave Up War', description: 'Mauryan Empire' },
        { id: 'ch9', title: 'Vital Villages, Thriving Towns', description: 'Economic development' },
        { id: 'ch10', title: 'Traders, Kings and Pilgrims', description: 'Trade routes' }
      ],
      '7': [
        { id: 'ch1', title: 'Tracing Changes Through a Thousand Years', description: 'Medieval period overview' },
        { id: 'ch2', title: 'New Kings and Kingdoms', description: 'Regional dynasties' },
        { id: 'ch3', title: 'The Delhi Sultans', description: 'Sultanate period' },
        { id: 'ch4', title: 'The Mughal Empire', description: 'Mughal administration' },
        { id: 'ch5', title: 'Rulers and Buildings', description: 'Architecture' },
        { id: 'ch6', title: 'Towns, Traders and Craftspersons', description: 'Urban economy' },
        { id: 'ch7', title: 'Tribes, Nomads and Settled Communities', description: 'Social organization' },
        { id: 'ch8', title: 'Devotional Paths to the Divine', description: 'Bhakti movement' },
        { id: 'ch9', title: 'The Making of Regional Cultures', description: 'Cultural diversity' },
        { id: 'ch10', title: 'Eighteenth-Century Political Formations', description: 'Regional powers' }
      ],
      '8': [
        { id: 'ch1', title: 'How, When and Where', description: 'Colonial history' },
        { id: 'ch2', title: 'From Trade to Territory', description: 'East India Company' },
        { id: 'ch3', title: 'Ruling the Countryside', description: 'Land revenue systems' },
        { id: 'ch4', title: 'Tribals, Dikus and the Vision of a Golden Age', description: 'Tribal resistance' },
        { id: 'ch5', title: 'When People Rebel', description: '1857 Revolt' },
        { id: 'ch6', title: 'Colonialism and the City', description: 'Urban development' },
        { id: 'ch7', title: 'Weavers, Iron Smelters and Factory Owners', description: 'Industrialization' },
        { id: 'ch8', title: 'Civilising the "Native", Educating the Nation', description: 'Education policy' },
        { id: 'ch9', title: 'Women, Caste and Reform', description: 'Social reforms' },
        { id: 'ch10', title: 'The Changing World of Visual Arts', description: 'Art under colonialism' }
      ],
      '9': [
        { id: 'ch1', title: 'The French Revolution', description: 'Causes and impact' },
        { id: 'ch2', title: 'Socialism in Europe and the Russian Revolution', description: 'Socialist movements' },
        { id: 'ch3', title: 'Nazism and the Rise of Hitler', description: 'World War II origins' },
        { id: 'ch4', title: 'Forest Society and Colonialism', description: 'Environmental history' },
        { id: 'ch5', title: 'Pastoralists in the Modern World', description: 'Nomadic communities' },
        { id: 'ch6', title: 'Peasants and Farmers', description: 'Agricultural changes' },
        { id: 'ch7', title: 'History and Sport: The Story of Cricket', description: 'Colonial sports' },
        { id: 'ch8', title: 'Clothing: A Social History', description: 'Fashion and identity' }
      ],
      '10': [
        { id: 'ch1', title: 'The Rise of Nationalism in Europe', description: 'Nation-state formation' },
        { id: 'ch2', title: 'Nationalism in India', description: 'Freedom struggle' },
        { id: 'ch3', title: 'The Making of a Global World', description: 'Trade and globalization' },
        { id: 'ch4', title: 'The Age of Industrialisation', description: 'Industrial revolution' },
        { id: 'ch5', title: 'Print Culture and the Modern World', description: 'Communication revolution' },
        { id: 'ch6', title: 'Resources and Development', description: 'Resource planning' },
        { id: 'ch7', title: 'Forest and Wildlife Resources', description: 'Conservation' },
        { id: 'ch8', title: 'Water Resources', description: 'Water management' },
        { id: 'ch9', title: 'Agriculture', description: 'Farming systems' },
        { id: 'ch10', title: 'Minerals and Energy Resources', description: 'Resource distribution' }
      ]
    }
  },
  english: {
    id: 'english',
    name: 'English',
    icon: '📚',
    color: 'from-purple-500 to-pink-500',
    chapters: {
      '6': [
        { id: 'ch1', title: 'A Tale of Two Birds', description: 'Story about nature vs nurture' },
        { id: 'ch2', title: 'The Friendly Mongoose', description: 'Folktale about trust' },
        { id: 'ch3', title: 'The Shepherd\'s Treasure', description: 'Story of wisdom and honesty' },
        { id: 'ch4', title: 'The Old-Clock Shop', description: 'Mystery and adventure' },
        { id: 'ch5', title: 'Tansen', description: 'Biography of the great musician' },
        { id: 'ch6', title: 'The Monkey and the Crocodile', description: 'Story of friendship and wit' },
        { id: 'ch7', title: 'The Wonder Called Sleep', description: 'Science of sleep' },
        { id: 'ch8', title: 'A Pact with the Sun', description: 'Fantasy story' },
        { id: 'ch9', title: 'What Happened to the Reptiles', description: 'Fable about consequences' },
        { id: 'ch10', title: 'A Strange Wrestling Match', description: 'Adventure tale' }
      ],
      '7': [
        { id: 'ch1', title: 'Three Questions', description: 'Story by Leo Tolstoy' },
        { id: 'ch2', title: 'A Gift of Chappals', description: 'Children\'s innocence' },
        { id: 'ch3', title: 'Gopal and the Hilsa Fish', description: 'Folktale about clever thinking' },
        { id: 'ch4', title: 'The Ashes That Made Trees Bloom', description: 'Japanese folktale' },
        { id: 'ch5', title: 'Quality', description: 'Story of craftsmanship' },
        { id: 'ch6', title: 'Expert Detectives', description: 'Mystery story' },
        { id: 'ch7', title: 'The Invention of Vita-Wonk', description: 'Science fiction' },
        { id: 'ch8', title: 'Fire: Friend and Foe', description: 'Informational text' },
        { id: 'ch9', title: 'A Bicycle in Good Repair', description: 'Humorous story' },
        { id: 'ch10', title: 'The Story of Cricket', description: 'History of the sport' }
      ],
      '8': [
        { id: 'ch1', title: 'The Best Christmas Present in the World', description: 'War story' },
        { id: 'ch2', title: 'The Tsunami', description: 'Natural disaster account' },
        { id: 'ch3', title: 'Glimpses of the Past', description: 'Historical overview' },
        { id: 'ch4', title: 'Bepin Choudhury\'s Lapse of Memory', description: 'Mystery story' },
        { id: 'ch5', title: 'The Summit Within', description: 'Mountaineering experience' },
        { id: 'ch6', title: 'This is Jody\'s Fawn', description: 'Story about compassion' },
        { id: 'ch7', title: 'A Visit to Cambridge', description: 'Meeting Stephen Hawking' },
        { id: 'ch8', title: 'A Short Monsoon Diary', description: 'Nature writing' },
        { id: 'ch9', title: 'The Great Stone Face', description: 'Story about ideals' },
        { id: 'ch10', title: 'The Comet', description: 'Science fiction tale' }
      ],
      '9': [
        { id: 'ch1', title: 'The Fun They Had', description: 'Future of education' },
        { id: 'ch2', title: 'The Sound of Music', description: 'Biography of musicians' },
        { id: 'ch3', title: 'The Little Girl', description: 'Father-daughter relationship' },
        { id: 'ch4', title: 'A Truly Beautiful Mind', description: 'Einstein\'s biography' },
        { id: 'ch5', title: 'The Snake and the Mirror', description: 'Humorous tale' },
        { id: 'ch6', title: 'My Childhood', description: 'APJ Abdul Kalam\'s memoir' },
        { id: 'ch7', title: 'Packing', description: 'Humorous essay' },
        { id: 'ch8', title: 'Reach for the Top', description: 'Inspiring biographies' },
        { id: 'ch9', title: 'The Bond of Love', description: 'Human-animal relationship' },
        { id: 'ch10', title: 'Kathmandu', description: 'Travelogue' }
      ],
      '10': [
        { id: 'ch1', title: 'A Letter to God', description: 'Story about faith' },
        { id: 'ch2', title: 'Nelson Mandela: Long Walk to Freedom', description: 'Autobiography excerpt' },
        { id: 'ch3', title: 'Two Stories about Flying', description: 'Overcoming fear' },
        { id: 'ch4', title: 'From the Diary of Anne Frank', description: 'Holocaust memoir' },
        { id: 'ch5', title: 'The Hundred Dresses', description: 'Story about bullying' },
        { id: 'ch6', title: 'Glimpses of India', description: 'Cultural sketches' },
        { id: 'ch7', title: 'Mijbil the Otter', description: 'Pet story' },
        { id: 'ch8', title: 'Madam Rides the Bus', description: 'Child\'s adventure' },
        { id: 'ch9', title: 'The Sermon at Benares', description: 'Buddha\'s teaching' },
        { id: 'ch10', title: 'The Proposal', description: 'One-act play' }
      ]
    }
  },
  hindi: {
    id: 'hindi',
    name: 'Hindi',
    icon: '🇮🇳',
    color: 'from-yellow-500 to-orange-500',
    chapters: {
      '6': [
        { id: 'ch1', title: 'वह चिड़िया जो', description: 'कविता' },
        { id: 'ch2', title: 'बचपन', description: 'संस्मरण' },
        { id: 'ch3', title: 'नादान दोस्त', description: 'कहानी' },
        { id: 'ch4', title: 'चाँद से थोड़ी सी गप्पें', description: 'कविता' },
        { id: 'ch5', title: 'अक्षरों का महत्व', description: 'निबंध' },
        { id: 'ch6', title: 'पार नज़र के', description: 'कहानी' },
        { id: 'ch7', title: 'साथी हाथ बढ़ाना', description: 'गीत' },
        { id: 'ch8', title: 'ऐसे-ऐसे', description: 'व्यंग्य' },
        { id: 'ch9', title: 'टिकट अलबम', description: 'कहानी' },
        { id: 'ch10', title: 'झांसी की रानी', description: 'कविता' }
      ],
      '7': [
        { id: 'ch1', title: 'हम पंछी उन्मुक्त गगन के', description: 'कविता' },
        { id: 'ch2', title: 'दादी माँ', description: 'संस्मरण' },
        { id: 'ch3', title: 'हिमालय की बेटियां', description: 'यात्रा वृत्तांत' },
        { id: 'ch4', title: 'कठपुतली', description: 'कविता' },
        { id: 'ch5', title: 'मीठाईवाला', description: 'कहानी' },
        { id: 'ch6', title: 'रक्त और हमारा शरीर', description: 'निबंध' },
        { id: 'ch7', title: 'पापा खो गए', description: 'नाटक' },
        { id: 'ch8', title: 'शाम एक किसान', description: 'कविता' },
        { id: 'ch9', title: 'चिड़िया की बच्ची', description: 'कहानी' },
        { id: 'ch10', title: 'अपूर्व अनुभव', description: 'संस्मरण' }
      ],
      '8': [
        { id: 'ch1', title: 'ध्वनि', description: 'कविता' },
        { id: 'ch2', title: 'लाख की चूड़ियां', description: 'कहानी' },
        { id: 'ch3', title: 'बस की यात्रा', description: 'व्यंग्य' },
        { id: 'ch4', title: 'दीवानों की हस्ती', description: 'कविता' },
        { id: 'ch5', title: 'चिट्ठियों की अनूठी दुनिया', description: 'निबंध' },
        { id: 'ch6', title: 'भगवान के डाकिए', description: 'कविता' },
        { id: 'ch7', title: 'क्या निराश हुआ जाए', description: 'निबंध' },
        { id: 'ch8', title: 'यह सबसे कठिन समय नहीं', description: 'कविता' },
        { id: 'ch9', title: 'कबीर की साखियां', description: 'दोहे' },
        { id: 'ch10', title: 'कामचोर', description: 'कहानी' }
      ],
      '9': [
        { id: 'ch1', title: 'दो बैलों की कथा', description: 'कहानी' },
        { id: 'ch2', title: 'ल्हासा की ओर', description: 'यात्रा वृत्तांत' },
        { id: 'ch3', title: 'उपभोक्तावाद की संस्कृति', description: 'निबंध' },
        { id: 'ch4', title: 'सांवले सपनों की याद', description: 'संस्मरण' },
        { id: 'ch5', title: 'नाना साहब की पुत्री देवी मैना को भस्म कर दिया गया', description: 'कहानी' },
        { id: 'ch6', title: 'प्रेमचंद के फटे जूते', description: 'निबंध' },
        { id: 'ch7', title: 'मेरे बचपन के दिन', description: 'संस्मरण' },
        { id: 'ch8', title: 'एक कुत्ता और एक मैना', description: 'संस्मरण' },
        { id: 'ch9', title: 'साखियाँ एवं सबद', description: 'कबीर' },
        { id: 'ch10', title: 'वाख', description: 'ललद्यद' }
      ],
      '10': [
        { id: 'ch1', title: 'सूरदास के पद', description: 'भक्ति काव्य' },
        { id: 'ch2', title: 'राम-लक्ष्मण-परशुराम संवाद', description: 'तुलसीदास' },
        { id: 'ch3', title: 'देव', description: 'रीतिकालीन कविता' },
        { id: 'ch4', title: 'उद्धव प्रसंग', description: 'सूरदास' },
        { id: 'ch5', title: 'बिहारी के दोहे', description: 'नीति और श्रृंगार' },
        { id: 'ch6', title: 'नेताजी का चश्मा', description: 'कहानी' },
        { id: 'ch7', title: 'बालगोबिन भगत', description: 'व्यक्तिचित्र' },
        { id: 'ch8', title: 'लखनवी अंदाज़', description: 'व्यंग्य' },
        { id: 'ch9', title: 'मानवीय करुणा की दिव्य चमक', description: 'निबंध' },
        { id: 'ch10', title: 'एक कहानी यह भी', description: 'आत्मकथा' }
      ]
    }
  }
};

export function getSubjectById(id: string): Subject | undefined {
  return CURRICULUM_DATA[id];
}

export function getChaptersByClass(subjectId: string, classLevel: string): Chapter[] {
  const subject = CURRICULUM_DATA[subjectId];
  return subject?.chapters[classLevel] || [];
}

export function getAllSubjects(): Subject[] {
  return Object.values(CURRICULUM_DATA);
}

export function getClassLevels(): string[] {
  return ['6', '7', '8', '9', '10'];
}
