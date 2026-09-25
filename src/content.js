// ─── Contenu pédagogique ───────────────────────────────────────────
// Mot : [romaji, écriture, lecture kana, français]
// Phrase : { r: romaji, jp, fr, t: jetons romaji dans l'ordre, say?: lecture pour la synthèse vocale }

const THEMES = {
  societe:   { fr: "Société",   jp: "社会", r: "shakai" },
  histoire:  { fr: "Histoire",  jp: "歴史", r: "rekishi" },
  politique: { fr: "Politique", jp: "政治", r: "seiji" },
  arts:      { fr: "Arts",      jp: "芸術", r: "geijutsu" },
};

const LESSONS = [
{
  id: "l1", theme: "societe", title: "S'incliner et se présenter", jp: "お辞儀と挨拶", r: "ojigi to aisatsu",
  culture: [
    "Au Japon, le salut ne passe pas par la poignée de main mais par l'<b>ojigi</b> (お辞儀), l'inclinaison du buste. Son angle dit la relation : environ 15° pour un salut léger entre collègues (<i>eshaku</i>), 30° pour un client ou un supérieur (<i>keirei</i>), 45° et plus pour des excuses sincères ou une profonde gratitude (<i>saikeirei</i>).",
    "On s'adresse aux autres en ajoutant <b>-san</b> au nom de famille — jamais à son propre nom. Un professeur, un médecin ou un maître d'art devient <b>sensei</b>. Dans le monde professionnel, la carte de visite (<b>meishi</b>) se tend et se reçoit à deux mains, texte tourné vers l'autre, puis se pose devant soi pendant l'entretien.",
    "Derrière ces codes se trouve la distinction <i>uchi / soto</i> — le cercle intérieur (famille, entreprise) et l'extérieur — qui règle tout le niveau de politesse de la langue."
  ],
  vocab: [
    ["konnichiwa","こんにちは","こんにちは","bonjour"],
    ["hajimemashite","はじめまして","はじめまして","enchanté(e)"],
    ["arigatō","ありがとう","ありがとう","merci"],
    ["sumimasen","すみません","すみません","excusez-moi, pardon"],
    ["ojigi","お辞儀","おじぎ","salut en s'inclinant"],
    ["watashi","私","わたし","je, moi"],
    ["sensei","先生","せんせい","professeur, maître"],
    ["gakusei","学生","がくせい","étudiant(e)"],
    ["nihon","日本","にほん","Japon"],
    ["nihon-jin","日本人","にほんじん","Japonais(e)"],
    ["furansu-jin","フランス人","フランスじん","Français(e)"],
    ["meishi","名刺","めいし","carte de visite"],
  ],
  kanji: ["人","日","本","先","生","学","名"],
  grammar: {
    title: "A wa B desu — la phrase de base",
    explain: [
      "<b>wa</b> (écrit は) marque le thème : « quant à A… ». <b>desu</b> clôt la phrase poliment : « …c'est B ».",
      "Pour la négation, <b>desu</b> devient <b>ja arimasen</b>. Pour poser une question, on ajoute simplement <b>ka</b> à la fin — pas d'inversion, l'intonation monte légèrement.",
      "Le sujet « je » est très souvent omis quand il est évident : <i>Gakusei desu.</i> suffit."
    ],
    table: { head: ["Forme", "Romaji", "Écriture"], rows: [
      ["Affirmatif", "gakusei desu", "学生です"],
      ["Négatif", "gakusei ja arimasen", "学生じゃありません"],
      ["Question", "gakusei desu ka", "学生ですか"],
    ]},
  },
  sentences: [
    { r:"Watashi wa gakusei desu.", jp:"私は学生です。", fr:"Je suis étudiant.", t:["Watashi","wa","gakusei","desu"] },
    { r:"Hajimemashite, Yugō desu.", jp:"はじめまして、ユゴーです。", fr:"Enchanté, je suis Hugo.", t:["Hajimemashite","Yugō","desu"] },
    { r:"Tanaka-san wa sensei desu ka.", jp:"田中さんは先生ですか。", fr:"Madame Tanaka est-elle professeure ?", t:["Tanaka-san","wa","sensei","desu","ka"] },
    { r:"Watashi wa nihon-jin ja arimasen.", jp:"私は日本人じゃありません。", fr:"Je ne suis pas japonais.", t:["Watashi","wa","nihon-jin","ja arimasen"] },
    { r:"Furansu-jin desu.", jp:"フランス人です。", fr:"Je suis français.", t:["Furansu-jin","desu"] },
  ],
  conj: [
    { q:"Watashi wa sensei ___.", hint:"« je ne suis pas professeur »", a:["ja arimasen","dewa arimasen"] },
    { q:"Tanaka-san wa gakusei ___ ?", hint:"question polie", a:["desu ka"] },
    { q:"Nihon-jin ___.", hint:"« je suis japonais »", a:["desu"] },
  ],
  quiz: [
    { q:"Quel salut exprime des excuses profondes ?", o:["saikeirei (45° et plus)","eshaku (15°)","keirei (30°)"], a:0 },
    { q:"À quel nom ajoute-t-on « -san » ?", o:["Au nom des autres","À son propre nom","Aux deux"], a:0 },
    { q:"Comment reçoit-on un meishi ?", o:["À deux mains","D'une main, vite rangé en poche","On le refuse poliment"], a:0 },
  ],
},
{
  id: "l2", theme: "histoire", title: "Kyōto, mille ans de capitale", jp: "千年の都・京都", r: "sennen no miyako, Kyōto",
  culture: [
    "En <b>794</b>, l'empereur Kanmu installe la cour à <b>Heian-kyō</b>, la « capitale de la paix et de la tranquillité ». Sous le nom de <b>Kyōto</b> (京都, littéralement « capitale-métropole »), elle reste la résidence impériale pendant plus de mille ans, jusqu'en <b>1868</b>.",
    "L'époque Heian (794–1185) voit fleurir une culture de cour raffinée : vers l'an 1000, la dame d'honneur <b>Murasaki Shikibu</b> écrit le <i>Dit du Genji</i>, souvent présenté comme l'un des premiers romans au monde.",
    "Aujourd'hui, la ville compte plus de 1 600 temples bouddhiques (<b>tera</b>) et des centaines de sanctuaires shintō (<b>jinja</b>), dont le Kinkaku-ji, le Pavillon d'or. En 1868, l'empereur Meiji s'installe à Edo, rebaptisée <b>Tōkyō</b> : « la capitale de l'Est »."
  ],
  vocab: [
    ["miyako","都","みやこ","capitale (ancienne)"],
    ["Kyōto","京都","きょうと","Kyōto"],
    ["Tōkyō","東京","とうきょう","Tōkyō"],
    ["rekishi","歴史","れきし","histoire"],
    ["tennō","天皇","てんのう","empereur du Japon"],
    ["tera","寺","てら","temple bouddhique"],
    ["jinja","神社","じんじゃ","sanctuaire shintō"],
    ["furui","古い","ふるい","ancien, vieux"],
    ["yama","山","やま","montagne"],
    ["kawa","川","かわ","rivière"],
    ["kirei","きれい","きれい","beau, propre"],
  ],
  kanji: ["京","都","天","皇","山","川"],
  grammar: {
    title: "Kore, sore, are — et la particule no",
    explain: [
      "Le japonais pointe selon la distance : <b>kore</b> (ceci, près de moi), <b>sore</b> (cela, près de toi), <b>are</b> (là-bas, loin des deux), <b>dore</b> (lequel ?). Devant un nom, ils deviennent <b>kono / sono / ano / dono</b>.",
      "<b>no</b> relie deux noms : « A no B » = « le B de A ». <i>Nihon no miyako</i> : la capitale du Japon. L'ordre est l'inverse du français.",
      "<b>ni arimasu</b> indique où se trouve une chose : <i>Tera wa Kyōto ni arimasu</i> — le temple se trouve à Kyōto."
    ],
    table: { head: ["Seul", "Devant un nom", "Sens"], rows: [
      ["kore", "kono tera", "ceci / ce temple-ci"],
      ["sore", "sono tera", "cela / ce temple-là (près de toi)"],
      ["are", "ano tera", "là-bas / ce temple là-bas"],
      ["dore", "dono tera", "lequel / quel temple ?"],
    ]},
  },
  sentences: [
    { r:"Kore wa furui tera desu.", jp:"これは古い寺です。", fr:"Ceci est un vieux temple.", t:["Kore","wa","furui","tera","desu"] },
    { r:"Kyōto wa nihon no furui miyako desu.", jp:"京都は日本の古い都です。", fr:"Kyōto est l'ancienne capitale du Japon.", t:["Kyōto","wa","nihon","no","furui","miyako","desu"] },
    { r:"Are wa jinja desu ka.", jp:"あれは神社ですか。", fr:"Là-bas, c'est un sanctuaire ?", t:["Are","wa","jinja","desu","ka"] },
    { r:"Kinkaku-ji wa Kyōto ni arimasu.", jp:"金閣寺は京都にあります。", fr:"Le Kinkaku-ji se trouve à Kyōto.", t:["Kinkaku-ji","wa","Kyōto","ni","arimasu"] },
    { r:"Ano yama wa kirei desu.", jp:"あの山はきれいです。", fr:"Cette montagne là-bas est belle.", t:["Ano","yama","wa","kirei","desu"] },
  ],
  conj: [
    { q:"___ tera wa furui desu.", hint:"« ce temple-ci »", a:["kono"] },
    { q:"Kore wa jinja ___.", hint:"négatif poli de desu", a:["ja arimasen","dewa arimasen"] },
    { q:"Tera wa Kyōto ni ___.", hint:"« se trouve »", a:["arimasu"] },
    { q:"Nihon ___ rekishi.", hint:"« l'histoire du Japon »", a:["no"] },
  ],
  quiz: [
    { q:"En quelle année la cour s'installe-t-elle à Heian-kyō ?", o:["794","1185","1868"], a:0 },
    { q:"Que signifie « Tōkyō » ?", o:["La capitale de l'Est","La ville du soleil","La nouvelle Kyōto"], a:0 },
    { q:"Qui a écrit le Dit du Genji ?", o:["Murasaki Shikibu","Katsushika Hokusai","Sen no Rikyū"], a:0 },
  ],
},
{
  id: "l3", theme: "arts", title: "La voie du thé", jp: "茶道", r: "sadō",
  culture: [
    "Le <b>sadō</b> (茶道), « voie du thé », transforme un geste simple — préparer et boire un bol de <b>matcha</b> — en discipline esthétique. Au XVIe siècle, <b>Sen no Rikyū</b> (1522–1591) en fixe l'esprit : des pavillons minuscules, des bols rustiques, une attention totale à l'instant.",
    "Le maître fouette la poudre de thé avec un fouet en bambou (<i>chasen</i>) dans le bol (<b>chawan</b>). L'invité fait tourner le bol avant de boire pour ne pas porter les lèvres sur sa « face », puis admire l'objet. Une petite confiserie, le <b>wagashi</b>, adoucit l'amertume.",
    "Deux idées portent cette pratique : <b>ichigo ichie</b> (一期一会), « une rencontre, une seule fois » — chaque cérémonie est unique — et le <b>wabi-sabi</b>, beauté du dépouillé, de l'imparfait et de l'éphémère."
  ],
  vocab: [
    ["ocha","お茶","おちゃ","thé"],
    ["sadō","茶道","さどう","voie du thé"],
    ["matcha","抹茶","まっちゃ","thé vert en poudre"],
    ["chawan","茶碗","ちゃわん","bol (à thé, à riz)"],
    ["chashitsu","茶室","ちゃしつ","pavillon de thé"],
    ["wagashi","和菓子","わがし","confiserie japonaise"],
    ["nomimasu","飲みます","のみます","boire"],
    ["tabemasu","食べます","たべます","manger"],
    ["mimasu","見ます","みます","regarder, voir"],
    ["shizuka","静か","しずか","calme, silencieux"],
    ["kōhī","コーヒー","コーヒー","café"],
    ["ichigo ichie","一期一会","いちごいちえ","une rencontre, une seule fois"],
  ],
  kanji: ["茶","食","見","心"],
  grammar: {
    title: "Les verbes en -masu et la particule o",
    explain: [
      "La forme polie des verbes se termine par <b>-masu</b>. Elle vaut pour le présent comme pour le futur : <i>nomimasu</i> = je bois / je boirai.",
      "La négation remplace <b>-masu</b> par <b>-masen</b>.",
      "Le complément d'objet est marqué par <b>o</b> (écrit を), placé juste après lui. Le verbe vient toujours en dernier : <i>matcha o nomimasu</i> — « du matcha, je bois »."
    ],
    table: { head: ["Verbe", "Affirmatif", "Négatif"], rows: [
      ["boire", "nomimasu 飲みます", "nomimasen 飲みません"],
      ["manger", "tabemasu 食べます", "tabemasen 食べません"],
      ["voir", "mimasu 見ます", "mimasen 見ません"],
      ["faire", "shimasu します", "shimasen しません"],
    ]},
  },
  sentences: [
    { r:"Watashi wa matcha o nomimasu.", jp:"私は抹茶を飲みます。", fr:"Je bois du matcha.", t:["Watashi","wa","matcha","o","nomimasu"] },
    { r:"Wagashi o tabemasu.", jp:"和菓子を食べます。", fr:"Je mange une confiserie japonaise.", t:["Wagashi","o","tabemasu"] },
    { r:"Kōhī wa nomimasen.", jp:"コーヒーは飲みません。", fr:"Le café, je n'en bois pas.", t:["Kōhī","wa","nomimasen"] },
    { r:"Chashitsu wa shizuka desu.", jp:"茶室は静かです。", fr:"Le pavillon de thé est calme.", t:["Chashitsu","wa","shizuka","desu"] },
    { r:"Chawan o mimasu.", jp:"茶碗を見ます。", fr:"Je regarde le bol.", t:["Chawan","o","mimasu"] },
  ],
  conj: [
    { q:"nomimasu → négatif", hint:"« ne pas boire »", a:["nomimasen"] },
    { q:"tabemasu → négatif", hint:"« ne pas manger »", a:["tabemasen"] },
    { q:"Ocha ___ nomimasu.", hint:"particule du complément d'objet", a:["o","wo"] },
    { q:"Terebi wa ___.", hint:"« je ne regarde pas » (mimasu)", a:["mimasen"] },
  ],
  quiz: [
    { q:"Qui a fixé l'esprit de la voie du thé au XVIe siècle ?", o:["Sen no Rikyū","L'empereur Kanmu","Murasaki Shikibu"], a:0 },
    { q:"Que veut dire « ichigo ichie » ?", o:["Une rencontre, une seule fois","Un thé, un gâteau","Le premier jour de l'an"], a:0 },
    { q:"Pourquoi l'invité tourne-t-il le bol ?", o:["Pour ne pas boire par sa « face »","Pour refroidir le thé","Pour mélanger la poudre"], a:0 },
  ],
},
{
  id: "l4", theme: "politique", title: "La Diète et la Constitution", jp: "国会と憲法", r: "kokkai to kenpō",
  culture: [
    "Après la défaite de 1945, le Japon adopte une nouvelle <b>kenpō</b> (憲法), entrée en vigueur le <b>3 mai 1947</b> — jour aujourd'hui férié. Elle fait de l'empereur « le <b>symbole</b> de l'État et de l'unité du peuple », sans pouvoir politique : la souveraineté appartient au peuple.",
    "Son article 9, célèbre et débattu, déclare que le peuple japonais renonce à la guerre comme droit souverain. Le mot <b>heiwa</b> (平和), la paix, est au cœur de l'identité politique d'après-guerre.",
    "Le parlement, la <b>Kokkai</b> (国会, la Diète), compte deux chambres : la Chambre des représentants (<i>Shūgiin</i>) et la Chambre des conseillers (<i>Sangiin</i>). C'est la Diète qui désigne le Premier ministre (<b>sōri daijin</b>). Depuis 2016, on peut voter (<b>tōhyō</b>) dès 18 ans."
  ],
  vocab: [
    ["seiji","政治","せいじ","politique"],
    ["kokkai","国会","こっかい","Diète, parlement"],
    ["kenpō","憲法","けんぽう","constitution"],
    ["senkyo","選挙","せんきょ","élection"],
    ["tōhyō","投票","とうひょう","vote"],
    ["sōri daijin","総理大臣","そうりだいじん","Premier ministre"],
    ["kuni","国","くに","pays, État"],
    ["heiwa","平和","へいわ","paix"],
    ["shōchō","象徴","しょうちょう","symbole"],
    ["nyūsu","ニュース","ニュース","actualités, info"],
    ["kinō","昨日","きのう","hier"],
  ],
  kanji: ["国","会","治","年"],
  grammar: {
    title: "Le passé poli : -mashita / -masen deshita",
    explain: [
      "Pour parler du passé, <b>-masu</b> devient <b>-mashita</b>, et <b>-masen</b> devient <b>-masen deshita</b>.",
      "<b>desu</b> suit la même logique : <b>deshita</b> (c'était), <b>ja arimasen deshita</b> (ce n'était pas).",
      "Les noms d'action comme <i>tōhyō</i> (vote) deviennent des verbes avec <b>shimasu</b> : <i>tōhyō shimashita</i>, j'ai voté."
    ],
    table: { head: ["Présent", "Passé", "Passé négatif"], rows: [
      ["shimasu", "shimashita", "shimasen deshita"],
      ["mimasu", "mimashita", "mimasen deshita"],
      ["arimasu", "arimashita", "arimasen deshita"],
      ["desu", "deshita", "ja arimasen deshita"],
    ]},
  },
  sentences: [
    { r:"Senkyo ga arimashita.", jp:"選挙がありました。", fr:"Il y a eu une élection.", t:["Senkyo","ga","arimashita"] },
    { r:"Watashi wa tōhyō shimashita.", jp:"私は投票しました。", fr:"J'ai voté.", t:["Watashi","wa","tōhyō","shimashita"] },
    { r:"Kinō nyūsu o mimasen deshita.", jp:"昨日ニュースを見ませんでした。", fr:"Hier, je n'ai pas regardé les informations.", t:["Kinō","nyūsu","o","mimasen deshita"] },
    { r:"Tennō wa kuni no shōchō desu.", jp:"天皇は国の象徴です。", fr:"L'empereur est le symbole de l'État.", t:["Tennō","wa","kuni","no","shōchō","desu"] },
    { r:"Kenpō wa heiwa no kenpō deshita.", jp:"憲法は平和の憲法でした。", fr:"La constitution était une constitution de paix.", t:["Kenpō","wa","heiwa","no","kenpō","deshita"] },
  ],
  conj: [
    { q:"shimasu → passé", hint:"« j'ai fait »", a:["shimashita"] },
    { q:"mimasu → passé négatif", hint:"« je n'ai pas regardé »", a:["mimasen deshita"] },
    { q:"desu → passé", hint:"« c'était »", a:["deshita"] },
    { q:"Kinō senkyo ga ___.", hint:"« il y a eu » (arimasu)", a:["arimashita"] },
  ],
  quiz: [
    { q:"Quand la Constitution actuelle est-elle entrée en vigueur ?", o:["3 mai 1947","15 août 1945","1er janvier 1868"], a:0 },
    { q:"Quel est le rôle de l'empereur selon elle ?", o:["Symbole de l'État et de l'unité du peuple","Chef du gouvernement","Chef des armées"], a:0 },
    { q:"Qui désigne le Premier ministre ?", o:["La Diète","L'empereur","Le vote direct des citoyens"], a:0 },
  ],
},
{
  id: "l5", theme: "societe", title: "Konbini et mots venus d'ailleurs", jp: "コンビニと外来語", r: "konbini to gairaigo",
  culture: [
    "Le Japon compte plus de 55 000 <b>konbini</b> (コンビニ, de l'anglais <i>convenience store</i>), la plupart ouverts jour et nuit. On y achète un <b>onigiri</b> ou un bento réchauffé sur place, mais on y paie aussi ses factures, envoie des colis, imprime des documents ou retire des billets de concert.",
    "Le mot lui-même montre une habitude de la langue : les mots empruntés (<i>gairaigo</i>) s'écrivent en <b>katakana</b> et se raccourcissent volontiers. <i>Pan</i> (パン, le pain) vient du portugais <i>pão</i>, arrivé au XVIe siècle avec les marchands ; <b>arubaito</b> (petit boulot) vient de l'allemand <i>Arbeit</i>.",
    "Certains mots sont même fabriqués au Japon à partir de l'anglais, le <i>wasei-eigo</i> : <i>sumaho</i> pour smartphone, <i>pasokon</i> pour ordinateur personnel. Savoir lire les katakana ouvre donc d'un coup des centaines de mots."
  ],
  vocab: [
    ["konbini","コンビニ","コンビニ","supérette ouverte 24 h/24"],
    ["pan","パン","パン","pain"],
    ["terebi","テレビ","テレビ","télévision"],
    ["arubaito","アルバイト","アルバイト","petit boulot"],
    ["onigiri","おにぎり","おにぎり","boulette de riz"],
    ["mise","店","みせ","magasin, boutique"],
    ["en","円","えん","yen"],
    ["oishii","おいしい","おいしい","bon, délicieux"],
    ["takai","高い","たかい","cher, haut"],
    ["yasui","安い","やすい","bon marché"],
    ["benri","便利","べんり","pratique"],
    ["ii","いい","いい","bien, bon"],
  ],
  kanji: ["円","店","大","小"],
  grammar: {
    title: "Les adjectifs en -i et en -na",
    explain: [
      "Les <b>adjectifs en -i</b> (oishii, takai) se conjuguent eux-mêmes : au négatif, le -i final devient <b>-kunai</b>, puis on ajoute desu. Exception : <i>ii</i> (bien) devient <b>yokunai</b>.",
      "Les <b>adjectifs en -na</b> (benri, shizuka, kirei) se comportent comme des noms : négatif en <b>ja arimasen</b>. Devant un nom, ils prennent <b>na</b> : <i>benri na mise</i>.",
      "Devant un nom, un adjectif en -i se place tel quel : <i>oishii pan</i>, du bon pain."
    ],
    table: { head: ["Adjectif", "Affirmatif", "Négatif"], rows: [
      ["-i : cher", "takai desu", "takakunai desu"],
      ["-i : bon", "oishii desu", "oishikunai desu"],
      ["exception : bien", "ii desu", "yokunai desu"],
      ["-na : pratique", "benri desu", "benri ja arimasen"],
    ]},
  },
  sentences: [
    { r:"Konbini wa benri desu.", jp:"コンビニは便利です。", fr:"Le konbini, c'est pratique.", t:["Konbini","wa","benri","desu"] },
    { r:"Kono pan wa oishii desu.", jp:"このパンはおいしいです。", fr:"Ce pain est délicieux.", t:["Kono","pan","wa","oishii","desu"] },
    { r:"Onigiri wa takakunai desu.", jp:"おにぎりは高くないです。", fr:"L'onigiri n'est pas cher.", t:["Onigiri","wa","takakunai","desu"] },
    { r:"Benri na mise desu.", jp:"便利な店です。", fr:"C'est un magasin pratique.", t:["Benri","na","mise","desu"] },
    { r:"Kōhī wa hyaku en desu.", jp:"コーヒーは百円です。", fr:"Le café coûte cent yens.", t:["Kōhī","wa","hyaku","en","desu"], say:"コーヒーはひゃくえんです。" },
  ],
  conj: [
    { q:"takai → négatif", hint:"« pas cher »", a:["takakunai desu","takakunai"] },
    { q:"ii → négatif", hint:"attention, exception", a:["yokunai desu","yokunai"] },
    { q:"benri → négatif", hint:"adjectif en -na", a:["benri ja arimasen","benri dewa arimasen"] },
    { q:"Shizuka ___ mise.", hint:"adjectif en -na devant un nom", a:["na"] },
  ],
  quiz: [
    { q:"D'où vient le mot « pan » (pain) ?", o:["Du portugais","De l'anglais","Du néerlandais"], a:0 },
    { q:"En quel alphabet s'écrivent la plupart des mots empruntés ?", o:["Katakana","Hiragana","Kanji"], a:0 },
    { q:"Que peut-on faire dans un konbini ?", o:["Payer ses factures et envoyer des colis","Seulement acheter à manger","Voter aux élections"], a:0 },
  ],
},
{
  id: "l6", theme: "histoire", title: "Meiji, le Japon s'ouvre", jp: "明治維新", r: "Meiji ishin",
  culture: [
    "En <b>1853</b>, les « navires noirs » (<b>kurofune</b>) du commodore américain Perry entrent dans la baie d'Edo et exigent l'ouverture des ports. Le shogunat, qui limitait les échanges avec l'étranger depuis deux siècles, vacille.",
    "En <b>1868</b>, la <b>restauration Meiji</b> rend le pouvoir à l'empereur, qui s'installe à Tōkyō. Le nouveau régime veut rattraper l'Occident au plus vite, avec pour devise <i>fukoku kyōhei</i> : « enrichir le pays, renforcer l'armée ». Les domaines féodaux deviennent des préfectures en 1871 et la classe des <b>samurai</b> est abolie.",
    "La première ligne de chemin de fer (<b>tetsudō</b>) relie Shinbashi à Yokohama en <b>1872</b>. En 1889, le Japon se dote de sa première constitution. En quelques décennies, le pays change (<b>kawarimasu</b>) de visage."
  ],
  vocab: [
    ["jidai","時代","じだい","époque, ère"],
    ["kurofune","黒船","くろふね","navires noirs"],
    ["kaikoku","開国","かいこく","ouverture du pays"],
    ["samurai","侍","さむらい","samouraï"],
    ["tetsudō","鉄道","てつどう","chemin de fer"],
    ["kisha","汽車","きしゃ","train à vapeur"],
    ["atarashii","新しい","あたらしい","nouveau"],
    ["ikimasu","行きます","いきます","aller"],
    ["kimasu","来ます","きます","venir"],
    ["norimasu","乗ります","のります","monter (dans un véhicule)"],
    ["kawarimasu","変わります","かわります","changer"],
    ["owarimasu","終わります","おわります","se terminer"],
  ],
  kanji: ["明","行","年"],
  grammar: {
    title: "La forme en -te : enchaîner les actions",
    explain: [
      "La <b>forme -te</b> relie deux actions : « je fais A, et puis B ». Le temps est donné par le dernier verbe : <i>kisha ni notte, ikimashita</i> — j'ai pris le train et je suis allé.",
      "Verbes en <b>-emasu</b> ou <b>-imasu</b> courts (groupe 2) : on remplace -masu par <b>-te</b> (tabemasu → tabete, mimasu → mite).",
      "Groupe 1 : la terminaison change selon la syllabe avant -masu : -ri/-chi/-i → <b>-tte</b> (norimasu → notte), -mi/-bi/-ni → <b>-nde</b> (nomimasu → nonde), -ki → <b>-ite</b> (kakimasu → kaite). Exception : ikimasu → <b>itte</b>. Irréguliers : shimasu → <b>shite</b>, kimasu → <b>kite</b>."
    ],
    table: { head: ["-masu", "Forme -te", "Règle"], rows: [
      ["tabemasu", "tabete", "groupe 2"],
      ["norimasu", "notte", "-ri → -tte"],
      ["nomimasu", "nonde", "-mi → -nde"],
      ["ikimasu", "itte", "exception"],
      ["kimasu / shimasu", "kite / shite", "irréguliers"],
    ]},
  },
  sentences: [
    { r:"Kurofune ga kite, nihon wa kawarimashita.", jp:"黒船が来て、日本は変わりました。", fr:"Les navires noirs sont arrivés, et le Japon a changé.", t:["Kurofune","ga","kite","nihon","wa","kawarimashita"] },
    { r:"Tennō wa Tōkyō ni ikimashita.", jp:"天皇は東京に行きました。", fr:"L'empereur est allé à Tōkyō.", t:["Tennō","wa","Tōkyō","ni","ikimashita"] },
    { r:"Kisha ni notte, Yokohama ni ikimashita.", jp:"汽車に乗って、横浜に行きました。", fr:"J'ai pris le train et je suis allé à Yokohama.", t:["Kisha","ni","notte","Yokohama","ni","ikimashita"] },
    { r:"Meiji jidai wa atarashii jidai deshita.", jp:"明治時代は新しい時代でした。", fr:"L'ère Meiji fut une ère nouvelle.", t:["Meiji","jidai","wa","atarashii","jidai","deshita"] },
    { r:"Samurai no jidai ga owarimashita.", jp:"侍の時代が終わりました。", fr:"L'époque des samouraïs a pris fin.", t:["Samurai","no","jidai","ga","owarimashita"] },
  ],
  conj: [
    { q:"ikimasu → forme -te", hint:"exception", a:["itte"] },
    { q:"nomimasu → forme -te", hint:"-mi → -nde", a:["nonde"] },
    { q:"tabemasu → forme -te", hint:"groupe 2", a:["tabete"] },
    { q:"kimasu → forme -te", hint:"irrégulier", a:["kite"] },
  ],
  quiz: [
    { q:"Qu'étaient les « kurofune » ?", o:["Les navires américains du commodore Perry","Les bateaux de pêche d'Edo","La flotte impériale de Kyōto"], a:0 },
    { q:"Que signifie « fukoku kyōhei » ?", o:["Enrichir le pays, renforcer l'armée","Fermer le pays, chasser les barbares","Civilisation et lumières"], a:0 },
    { q:"Quelle ligne ferroviaire ouvre en 1872 ?", o:["Shinbashi – Yokohama","Tōkyō – Kyōto","Ōsaka – Kōbe"], a:0 },
  ],
},
{
  id: "l7", theme: "arts", title: "Hokusai et le monde flottant", jp: "北斎と浮世絵", r: "Hokusai to ukiyo-e",
  culture: [
    "L'<b>ukiyo-e</b> (浮世絵), les « images du monde flottant », sont des estampes gravées sur bois produites en masse à l'époque Edo. Acteurs de kabuki, courtisanes, paysages : un art populaire, vendu pour le prix d'un bol de nouilles.",
    "<b>Katsushika Hokusai</b> (1760–1849) en est le plus célèbre maître. Vers 1831, il publie les <i>Trente-six vues du mont Fuji</i>, dont <i>La Grande Vague de Kanagawa</i> : une <b>nami</b> (vague) griffue qui menace des barques, avec le <b>Fuji-san</b> minuscule au loin. Il a aussi publié les carnets <i>Hokusai Manga</i>, croquis sur le vif.",
    "Arrivées en Europe dans la seconde moitié du XIXe siècle, ces estampes nourrissent le <b>japonisme</b> : Van Gogh en copie, Monet en réunit plus de deux cents dans sa maison de Giverny."
  ],
  vocab: [
    ["e","絵","え","image, peinture"],
    ["ukiyo-e","浮世絵","うきよえ","estampe du monde flottant"],
    ["hanga","版画","はんが","gravure, estampe"],
    ["nami","波","なみ","vague"],
    ["Fuji-san","富士山","ふじさん","mont Fuji"],
    ["bijutsukan","美術館","びじゅつかん","musée d'art"],
    ["manga","漫画","まんが","bande dessinée"],
    ["kakimasu","描きます","かきます","dessiner, peindre"],
    ["suki","好き","すき","aimé, qu'on aime"],
    ["ōkii","大きい","おおきい","grand"],
  ],
  kanji: ["絵","波","見","山"],
  grammar: {
    title: "Vouloir faire : -tai desu · aimer : ga suki desu",
    explain: [
      "Pour dire « je veux faire », on remplace <b>-masu</b> par <b>-tai desu</b> : mimasu → <i>mitai desu</i>, je veux voir.",
      "<b>-tai</b> se conjugue comme un adjectif en -i : négatif <b>-takunai desu</b> (je ne veux pas).",
      "« J'aime X » se dit <b>X ga suki desu</b> : ce qu'on aime est marqué par <b>ga</b>. <i>Suki</i> est un adjectif en -na."
    ],
    table: { head: ["-masu", "Je veux", "Je ne veux pas"], rows: [
      ["mimasu", "mitai desu", "mitakunai desu"],
      ["ikimasu", "ikitai desu", "ikitakunai desu"],
      ["kakimasu", "kakitai desu", "kakitakunai desu"],
      ["tabemasu", "tabetai desu", "tabetakunai desu"],
    ]},
  },
  sentences: [
    { r:"Hokusai no e ga suki desu.", jp:"北斎の絵が好きです。", fr:"J'aime les tableaux de Hokusai.", t:["Hokusai","no","e","ga","suki","desu"], say:"ほくさいのえがすきです。" },
    { r:"Bijutsukan de ukiyo-e o mitai desu.", jp:"美術館で浮世絵を見たいです。", fr:"Je veux voir des ukiyo-e au musée.", t:["Bijutsukan","de","ukiyo-e","o","mitai desu"] },
    { r:"Fuji-san no e o kakitai desu.", jp:"富士山の絵を描きたいです。", fr:"Je veux peindre le mont Fuji.", t:["Fuji-san","no","e","o","kakitai desu"], say:"ふじさんのえをかきたいです。" },
    { r:"Kono nami wa ōkii desu.", jp:"この波は大きいです。", fr:"Cette vague est grande.", t:["Kono","nami","wa","ōkii","desu"] },
    { r:"Nihon ni ikitai desu.", jp:"日本に行きたいです。", fr:"Je veux aller au Japon.", t:["Nihon","ni","ikitai desu"] },
  ],
  conj: [
    { q:"mimasu → je veux", hint:"« je veux voir »", a:["mitai desu","mitai"] },
    { q:"ikimasu → je veux", hint:"« je veux aller »", a:["ikitai desu","ikitai"] },
    { q:"tabemasu → je ne veux pas", hint:"« je ne veux pas manger »", a:["tabetakunai desu","tabetakunai"] },
    { q:"Manga ___ suki desu.", hint:"particule de ce qu'on aime", a:["ga"] },
  ],
  quiz: [
    { q:"Que signifie « ukiyo-e » ?", o:["Images du monde flottant","Peintures de la cour","Rouleaux sacrés"], a:0 },
    { q:"De quelle série fait partie La Grande Vague ?", o:["Trente-six vues du mont Fuji","Les Cinquante-trois étapes du Tōkaidō","Le Dit du Genji"], a:0 },
    { q:"Quel peintre collectionnait les estampes à Giverny ?", o:["Claude Monet","Paul Cézanne","Edgar Degas"], a:0 },
  ],
},
{
  id: "l8", theme: "societe", title: "Matsuri et saisons", jp: "祭りと季節", r: "matsuri to kisetsu",
  culture: [
    "Le calendrier japonais bat au rythme des <b>kisetsu</b> (saisons). Au <b>haru</b> (printemps), fin mars à Tōkyō, on pratique le <b>hanami</b> (花見) : pique-niquer entre amis sous les <b>sakura</b> en fleur. La météo publie même la progression du « front des cerisiers » (<i>sakura zensen</i>) du sud au nord.",
    "L'été (<b>natsu</b>) est la saison des <b>matsuri</b> : processions de sanctuaires portatifs (<i>mikoshi</i>), stands de nourriture, <b>yukata</b> de coton, et grands <b>hanabi</b> (feux d'artifice, littéralement « fleurs de feu »). Le Gion Matsuri de Kyōto, en juillet, remonte à l'an 869, quand on priait pour arrêter une épidémie.",
    "À l'automne, on part admirer les érables rougis (<i>momiji-gari</i>) : la même contemplation, avec d'autres couleurs."
  ],
  vocab: [
    ["kisetsu","季節","きせつ","saison"],
    ["haru","春","はる","printemps"],
    ["natsu","夏","なつ","été"],
    ["hana","花","はな","fleur"],
    ["sakura","桜","さくら","cerisier (en fleur)"],
    ["hanami","花見","はなみ","contemplation des fleurs"],
    ["matsuri","祭り","まつり","fête, festival"],
    ["hanabi","花火","はなび","feu d'artifice"],
    ["yukata","浴衣","ゆかた","kimono d'été en coton"],
    ["tomodachi","友達","ともだち","ami(e)"],
    ["issho ni","一緒に","いっしょに","ensemble"],
    ["kimasu (vêtement)","着ます","きます","porter (un vêtement)"],
  ],
  kanji: ["花","祭","雨","月"],
  grammar: {
    title: "Proposer : -mashō · inviter : -masen ka",
    explain: [
      "<b>-mashō</b> propose de faire quelque chose ensemble : <i>ikimashō</i>, allons-y !",
      "<b>-masen ka</b>, la négation en question, sert d'invitation polie : <i>ikimasen ka</i>, « tu ne voudrais pas venir ? ».",
      "<b>ni</b> situe dans le temps (haru ni, au printemps), <b>to</b> indique avec qui (tomodachi to, avec des amis)."
    ],
    table: { head: ["-masu", "Proposer", "Inviter"], rows: [
      ["ikimasu", "ikimashō", "ikimasen ka"],
      ["mimasu", "mimashō", "mimasen ka"],
      ["tabemasu", "tabemashō", "tabemasen ka"],
      ["shimasu", "shimashō", "shimasen ka"],
    ]},
  },
  sentences: [
    { r:"Haru ni hanami o shimashō.", jp:"春に花見をしましょう。", fr:"Au printemps, faisons hanami !", t:["Haru","ni","hanami","o","shimashō"] },
    { r:"Issho ni matsuri ni ikimasen ka.", jp:"一緒に祭りに行きませんか。", fr:"Ça te dirait d'aller à la fête ensemble ?", t:["Issho ni","matsuri","ni","ikimasen ka"] },
    { r:"Tomodachi to hanabi o mimashita.", jp:"友達と花火を見ました。", fr:"J'ai regardé le feu d'artifice avec des amis.", t:["Tomodachi","to","hanabi","o","mimashita"] },
    { r:"Sakura wa totemo kirei desu.", jp:"桜はとてもきれいです。", fr:"Les cerisiers sont très beaux.", t:["Sakura","wa","totemo","kirei","desu"] },
    { r:"Natsu ni yukata o kimasu.", jp:"夏に浴衣を着ます。", fr:"En été, on porte le yukata.", t:["Natsu","ni","yukata","o","kimasu"] },
  ],
  conj: [
    { q:"ikimasu → proposer", hint:"« allons-y »", a:["ikimashō","ikimashou","ikimasho"] },
    { q:"tabemasu → inviter", hint:"« tu ne veux pas manger ? »", a:["tabemasen ka"] },
    { q:"Tomodachi ___ ikimasu.", hint:"« avec des amis »", a:["to"] },
    { q:"Natsu ___ matsuri ga arimasu.", hint:"« en été »", a:["ni"] },
  ],
  quiz: [
    { q:"Que suit le « sakura zensen » ?", o:["La floraison des cerisiers du sud au nord","Le passage des typhons","Les dates des matsuri"], a:0 },
    { q:"Que signifie littéralement « hanabi » ?", o:["Fleurs de feu","Pluie d'été","Nuit de fête"], a:0 },
    { q:"D'où vient le Gion Matsuri ?", o:["De prières contre une épidémie en 869","D'une victoire militaire","De la fondation de Tōkyō"], a:0 },
  ],
},
];

// ─── Katakana ──────────────────────────────────────────────────────
const KANA_ROWS = [
  { id:"a",  label:"ア", cells:[["ア","a"],["イ","i"],["ウ","u"],["エ","e"],["オ","o"]] },
  { id:"ka", label:"カ", cells:[["カ","ka"],["キ","ki"],["ク","ku"],["ケ","ke"],["コ","ko"]] },
  { id:"sa", label:"サ", cells:[["サ","sa"],["シ","shi"],["ス","su"],["セ","se"],["ソ","so"]] },
  { id:"ta", label:"タ", cells:[["タ","ta"],["チ","chi"],["ツ","tsu"],["テ","te"],["ト","to"]] },
  { id:"na", label:"ナ", cells:[["ナ","na"],["ニ","ni"],["ヌ","nu"],["ネ","ne"],["ノ","no"]] },
  { id:"ha", label:"ハ", cells:[["ハ","ha"],["ヒ","hi"],["フ","fu"],["ヘ","he"],["ホ","ho"]] },
  { id:"ma", label:"マ", cells:[["マ","ma"],["ミ","mi"],["ム","mu"],["メ","me"],["モ","mo"]] },
  { id:"ya", label:"ヤ", cells:[["ヤ","ya"],null,["ユ","yu"],null,["ヨ","yo"]] },
  { id:"ra", label:"ラ", cells:[["ラ","ra"],["リ","ri"],["ル","ru"],["レ","re"],["ロ","ro"]] },
  { id:"wa", label:"ワ", cells:[["ワ","wa"],null,null,null,["ヲ","o"]] },
  { id:"n",  label:"ン", cells:[["ン","n"],null,null,null,null] },
  { id:"ga", label:"ガ", dak:true, cells:[["ガ","ga"],["ギ","gi"],["グ","gu"],["ゲ","ge"],["ゴ","go"]] },
  { id:"za", label:"ザ", dak:true, cells:[["ザ","za"],["ジ","ji"],["ズ","zu"],["ゼ","ze"],["ゾ","zo"]] },
  { id:"da", label:"ダ", dak:true, cells:[["ダ","da"],["ヂ","ji"],["ヅ","zu"],["デ","de"],["ド","do"]] },
  { id:"ba", label:"バ", dak:true, cells:[["バ","ba"],["ビ","bi"],["ブ","bu"],["ベ","be"],["ボ","bo"]] },
  { id:"pa", label:"パ", dak:true, cells:[["パ","pa"],["ピ","pi"],["プ","pu"],["ペ","pe"],["ポ","po"]] },
];

// Mots en katakana pour la lecture : [katakana, romaji, français]
const KANA_WORDS = [
  ["コーヒー","kōhī","café"],["パン","pan","pain"],["テレビ","terebi","télévision"],["カメラ","kamera","appareil photo"],
  ["ホテル","hoteru","hôtel"],["アニメ","anime","dessin animé"],["ゲーム","gēmu","jeu vidéo"],["タクシー","takushī","taxi"],
  ["ラーメン","rāmen","ramen"],["サッカー","sakkā","football"],["ピアノ","piano","piano"],["ノート","nōto","cahier"],
  ["バス","basu","bus"],["トマト","tomato","tomate"],["ワイン","wain","vin"],["カラオケ","karaoke","karaoké"],
  ["コンビニ","konbini","supérette"],["フランス","furansu","France"],["パリ","pari","Paris"],["アイス","aisu","glace"],
  ["ケーキ","kēki","gâteau"],["スマホ","sumaho","smartphone"],["ロボット","robotto","robot"],["ニュース","nyūsu","actualités"],
  ["デパート","depāto","grand magasin"],["ビール","bīru","bière"],["チーズ","chīzu","fromage"],["ユーロ","yūro","euro"],
  ["メモ","memo","note, mémo"],["ネクタイ","nekutai","cravate"],["セーター","sētā","pull"],["ドア","doa","porte"],
  ["ヨーロッパ","yōroppa","Europe"],["ギター","gitā","guitare"],["ナイフ","naifu","couteau"],["レモン","remon","citron"],
];

// ─── Kanji ─────────────────────────────────────────────────────────
// [kanji, sens, on'yomi, kun'yomi, exemples [[romaji, écriture, kana, français], …]]
const KANJI = [
  ["一","un","ICHI, ITSU","hito(tsu)",[["ichi","一","いち","un"],["hitotsu","一つ","ひとつ","un (objet)"]]],
  ["二","deux","NI","futa(tsu)",[["ni","二","に","deux"],["futatsu","二つ","ふたつ","deux (objets)"]]],
  ["三","trois","SAN","mit(tsu)",[["san","三","さん","trois"],["mittsu","三つ","みっつ","trois (objets)"]]],
  ["人","personne","JIN, NIN","hito",[["hito","人","ひと","personne"],["nihon-jin","日本人","にほんじん","Japonais(e)"]]],
  ["日","jour, soleil","NICHI, JITSU","hi, ka",[["nihon","日本","にほん","Japon"],["mainichi","毎日","まいにち","tous les jours"]]],
  ["本","origine, livre","HON","moto",[["hon","本","ほん","livre"],["nihon","日本","にほん","Japon"]]],
  ["月","lune, mois","GETSU, GATSU","tsuki",[["tsuki","月","つき","lune"],["getsuyōbi","月曜日","げつようび","lundi"]]],
  ["火","feu","KA","hi",[["hi","火","ひ","feu"],["hanabi","花火","はなび","feu d'artifice"]]],
  ["水","eau","SUI","mizu",[["mizu","水","みず","eau"],["suiyōbi","水曜日","すいようび","mercredi"]]],
  ["木","arbre","MOKU, BOKU","ki",[["ki","木","き","arbre"],["mokuyōbi","木曜日","もくようび","jeudi"]]],
  ["金","or, argent","KIN, KON","kane",[["okane","お金","おかね","argent"],["Kinkaku-ji","金閣寺","きんかくじ","Pavillon d'or"]]],
  ["土","terre","DO, TO","tsuchi",[["tsuchi","土","つち","terre, sol"],["doyōbi","土曜日","どようび","samedi"]]],
  ["山","montagne","SAN","yama",[["yama","山","やま","montagne"],["Fuji-san","富士山","ふじさん","mont Fuji"]]],
  ["川","rivière","SEN","kawa",[["kawa","川","かわ","rivière"]]],
  ["大","grand","DAI, TAI","ō(kii)",[["ōkii","大きい","おおきい","grand"],["daigaku","大学","だいがく","université"]]],
  ["小","petit","SHŌ","chii(sai), ko",[["chiisai","小さい","ちいさい","petit"]]],
  ["中","milieu, dedans","CHŪ","naka",[["naka","中","なか","intérieur"],["Chūgoku","中国","ちゅうごく","Chine"]]],
  ["口","bouche","KŌ, KU","kuchi",[["kuchi","口","くち","bouche"],["jinkō","人口","じんこう","population"]]],
  ["天","ciel","TEN","ame",[["tenki","天気","てんき","météo"],["tennō","天皇","てんのう","empereur"]]],
  ["皇","empereur","KŌ, Ō","—",[["tennō","天皇","てんのう","empereur"],["kōkyo","皇居","こうきょ","palais impérial"]]],
  ["学","étudier","GAKU","mana(bu)",[["gakusei","学生","がくせい","étudiant(e)"],["daigaku","大学","だいがく","université"]]],
  ["生","vie, naître","SEI, SHŌ","i(kiru), u(mareru)",[["sensei","先生","せんせい","professeur"],["gakusei","学生","がくせい","étudiant(e)"]]],
  ["先","avant, devant","SEN","saki",[["sensei","先生","せんせい","professeur"],["saki","先","さき","devant, plus tôt"]]],
  ["茶","thé","CHA, SA","—",[["ocha","お茶","おちゃ","thé"],["sadō","茶道","さどう","voie du thé"]]],
  ["国","pays","KOKU","kuni",[["kuni","国","くに","pays"],["kokkai","国会","こっかい","Diète"]]],
  ["会","réunion, rencontre","KAI, E","a(u)",[["kokkai","国会","こっかい","Diète"],["ichigo ichie","一期一会","いちごいちえ","une rencontre, une seule fois"]]],
  ["京","capitale","KYŌ, KEI","—",[["Kyōto","京都","きょうと","Kyōto"],["Tōkyō","東京","とうきょう","Tōkyō"]]],
  ["都","métropole","TO, TSU","miyako",[["miyako","都","みやこ","capitale"],["Kyōto","京都","きょうと","Kyōto"]]],
  ["花","fleur","KA","hana",[["hana","花","はな","fleur"],["hanami","花見","はなみ","contemplation des fleurs"]]],
  ["年","année","NEN","toshi",[["kotoshi","今年","ことし","cette année"],["rainen","来年","らいねん","l'an prochain"]]],
  ["子","enfant","SHI, SU","ko",[["kodomo","子ども","こども","enfant"]]],
  ["女","femme","JO, NYO","onna",[["onna no hito","女の人","おんなのひと","femme"]]],
  ["男","homme","DAN, NAN","otoko",[["otoko no hito","男の人","おとこのひと","homme"]]],
  ["名","nom","MEI, MYŌ","na",[["namae","名前","なまえ","nom, prénom"],["meishi","名刺","めいし","carte de visite"]]],
  ["語","langue, mot","GO","kata(ru)",[["nihongo","日本語","にほんご","langue japonaise"],["furansugo","フランス語","フランスご","langue française"]]],
  ["食","manger","SHOKU","ta(beru)",[["tabemasu","食べます","たべます","manger"],["washoku","和食","わしょく","cuisine japonaise"]]],
  ["見","voir","KEN","mi(ru)",[["mimasu","見ます","みます","regarder"],["hanami","花見","はなみ","contemplation des fleurs"]]],
  ["行","aller","KŌ, GYŌ","i(ku)",[["ikimasu","行きます","いきます","aller"],["ginkō","銀行","ぎんこう","banque"]]],
  ["雨","pluie","U","ame",[["ame","雨","あめ","pluie"],["tsuyu","梅雨","つゆ","saison des pluies"]]],
  ["円","cercle, yen","EN","maru(i)",[["en","円","えん","yen"],["hyaku en","百円","ひゃくえん","cent yens"]]],
  ["明","clair","MEI, MYŌ","aka(rui)",[["akarui","明るい","あかるい","lumineux"],["Meiji","明治","めいじ","ère Meiji"]]],
  ["治","gouverner, soigner","JI, CHI","osa(meru), nao(su)",[["seiji","政治","せいじ","politique"],["Meiji","明治","めいじ","ère Meiji"]]],
  ["絵","image, peinture","KAI, E","—",[["e","絵","え","image, peinture"],["ukiyo-e","浮世絵","うきよえ","estampe"]]],
  ["波","vague","HA","nami",[["nami","波","なみ","vague"]]],
  ["祭","fête","SAI","matsu(ri)",[["matsuri","祭り","まつり","fête, festival"]]],
  ["店","boutique","TEN","mise",[["mise","店","みせ","magasin"],["ten'in","店員","てんいん","vendeur, vendeuse"]]],
  ["心","cœur, esprit","SHIN","kokoro",[["kokoro","心","こころ","cœur, esprit"]]],
];
