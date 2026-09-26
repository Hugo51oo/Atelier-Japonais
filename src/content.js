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
{
  id: "l9", theme: "societe", title: "Le travail et l'entreprise", jp: "仕事と会社", r: "shigoto to kaisha",
  culture: [
    "L'entrée dans la vie active passe par le <b>shūkatsu</b> : à partir de la troisième année d'université, les étudiants enchaînent réunions d'information et entretiens, tous en costume sombre, pour décrocher un poste qui commencera en avril, à la sortie des études.",
    "Le contrat n'est pas signé, il est scellé : on appose son <b>hanko</b> (le sceau personnel à son nom) sur les documents officiels — même si la dématérialisation le fait reculer depuis 2020. Le soir, le <b>nomikai</b>, ce verre pris entre collègues, reste le moment où la parole se libère et où la hiérarchie s'allège un peu.",
    "L'emploi à vie et l'avancement à l'ancienneté, hérités de la haute croissance, se sont effrités : une part importante des salariés travaille aujourd'hui en contrat précaire. Le mot <b>karōshi</b> — la mort par surtravail — a donné lieu depuis 2019 à des plafonds légaux d'heures supplémentaires."
  ],
  vocab: [
    ["shigoto","仕事","しごと","travail"],
    ["kaisha","会社","かいしゃ","entreprise"],
    ["kaishain","会社員","かいしゃいん","employé d'entreprise"],
    ["hataraku","働きます","はたらきます","travailler"],
    ["hanko","判子","はんこ","sceau personnel"],
    ["meishi","名刺","めいし","carte de visite"],
    ["kaigi","会議","かいぎ","réunion"],
    ["nomikai","飲み会","のみかい","sortie à boire entre collègues"],
    ["isogashii","忙しい","いそがしい","occupé, chargé"],
    ["machimasu","待ちます","まちます","attendre"],
    ["ima","今","いま","maintenant"],
    ["mainichi","毎日","まいにち","tous les jours"],
  ],
  kanji: ["仕","事","社","員"],
  grammar: {
    title: "~te imasu et ~te kudasai",
    explain: [
      "La forme en <b>-te</b> suivie de <b>imasu</b> dit ce qui est en train de se passer : <i>hataraite imasu</i>, je suis en train de travailler. Elle sert aussi pour un état durable : <i>Tōkyō ni sunde imasu</i>, j'habite à Tōkyō.",
      "La même forme suivie de <b>kudasai</b> devient une demande polie : <i>matte kudasai</i>, attendez s'il vous plaît.",
      "Rappel des terminaisons : -mi/-bi/-ni → <b>-nde</b>, -ri/-chi/-i → <b>-tte</b>, -ki → <b>-ite</b>, groupe 2 → <b>-te</b>, et les irréguliers <i>shite</i>, <i>kite</i>."
    ],
    table: { head: ["Verbe", "En train de", "Demande"], rows: [
      ["hatarakimasu", "hataraite imasu", "hataraite kudasai"],
      ["machimasu", "matte imasu", "matte kudasai"],
      ["nomimasu", "nonde imasu", "nonde kudasai"],
      ["shimasu", "shite imasu", "shite kudasai"],
    ]},
  },
  sentences: [
    { r:"Ima, shigoto o shite imasu.", jp:"今、仕事をしています。", fr:"Là, je suis en train de travailler.", t:["Ima","shigoto","o","shite imasu"] },
    { r:"Chichi wa kaishain desu.", jp:"父は会社員です。", fr:"Mon père est employé d'entreprise.", t:["Chichi","wa","kaishain","desu"] },
    { r:"Sukoshi matte kudasai.", jp:"少し待ってください。", fr:"Attendez un instant, s'il vous plaît.", t:["Sukoshi","matte kudasai"] },
    { r:"Kyō wa kaigi ga arimasu.", jp:"今日は会議があります。", fr:"Aujourd'hui, il y a une réunion.", t:["Kyō","wa","kaigi","ga","arimasu"] },
    { r:"Mainichi hataraite, totemo isogashii desu.", jp:"毎日働いて、とても忙しいです。", fr:"Je travaille tous les jours, je suis très occupé.", t:["Mainichi","hataraite","totemo","isogashii","desu"] },
  ],
  conj: [
    { q:"hatarakimasu → en train de", hint:"« je suis en train de travailler »", a:["hataraite imasu","hataraiteimasu"] },
    { q:"machimasu → demande polie", hint:"« attendez, s'il vous plaît »", a:["matte kudasai"] },
    { q:"nomimasu → en train de", hint:"« je suis en train de boire »", a:["nonde imasu"] },
    { q:"mimasu → demande polie", hint:"« regardez, s'il vous plaît »", a:["mite kudasai"] },
  ],
  quiz: [
    { q:"Qu'est-ce que le shūkatsu ?", o:["La chasse à l'emploi des étudiants","La fête de fin d'année au bureau","Le salaire de départ"], a:0 },
    { q:"À quoi sert un hanko ?", o:["À valider un document officiel","À ouvrir le bureau","À payer au konbini"], a:0 },
    { q:"Que désigne le mot karōshi ?", o:["La mort par surtravail","Une prime d'ancienneté","Un congé sabbatique"], a:0 },
  ],
},
{
  id: "l10", theme: "societe", title: "À table", jp: "和食", r: "washoku",
  culture: [
    "Le <b>washoku</b>, la cuisine traditionnelle, est inscrit depuis <b>2013</b> au patrimoine culturel immatériel de l'UNESCO — moins pour ses recettes que pour son rapport aux saisons et au partage. Le repas type s'organise en « une soupe, trois plats » autour d'un bol de riz.",
    "Sa base est le <b>dashi</b>, bouillon d'algue kombu et de copeaux de bonite. C'est là que se loge l'<b>umami</b>, la cinquième saveur, identifiée en <b>1908</b> par le chimiste Kikunae Ikeda à partir du glutamate de l'algue kombu.",
    "On dit <b>itadakimasu</b> avant de manger — littéralement « je reçois » — et <b>gochisōsama</b> après, pour remercier de la peine prise. Les baguettes ne se plantent jamais dans le riz : ce geste est réservé aux offrandes aux défunts."
  ],
  vocab: [
    ["gohan","ご飯","ごはん","riz cuit, repas"],
    ["sakana","魚","さかな","poisson"],
    ["niku","肉","にく","viande"],
    ["yasai","野菜","やさい","légume"],
    ["mizu","水","みず","eau"],
    ["misoshiru","味噌汁","みそしる","soupe miso"],
    ["oishii","おいしい","おいしい","bon, délicieux"],
    ["itadakimasu","いただきます","いただきます","formule avant le repas"],
    ["hitotsu","一つ","ひとつ","un (objet)"],
    ["kudasai","ください","ください","s'il vous plaît, donnez-moi"],
    ["ikura","いくら","いくら","combien (prix)"],
  ],
  kanji: ["米","魚","肉","飲"],
  grammar: {
    title: "Compter en japonais",
    explain: [
      "Un nombre ne se met jamais seul devant un nom : il faut un <b>classificateur</b> qui dit de quel genre de chose on parle. Le plus général est la série <b>hitotsu, futatsu, mittsu…</b>, qui sert pour presque tout objet jusqu'à dix.",
      "Les principaux : <b>-nin</b> pour les personnes (hitori, futari, san-nin), <b>-hon</b> pour les objets longs (bouteilles, parapluies), <b>-mai</b> pour les objets plats (feuilles, billets), <b>-hai</b> pour les verres et les bols.",
      "Pour commander : <b>nom + o + quantité + kudasai</b>. <i>Bīru o futatsu kudasai</i> — deux bières, s'il vous plaît."
    ],
    table: { head: ["Ce qu'on compte", "1", "2"], rows: [
      ["objets en général", "hitotsu 一つ", "futatsu 二つ"],
      ["personnes", "hitori 一人", "futari 二人"],
      ["objets longs", "ippon 一本", "nihon 二本"],
      ["verres, bols", "ippai 一杯", "nihai 二杯"],
    ]},
  },
  sentences: [
    { r:"Sushi o futatsu kudasai.", jp:"寿司を二つください。", fr:"Deux sushis, s'il vous plaît.", t:["Sushi","o","futatsu","kudasai"] },
    { r:"Kono misoshiru wa oishii desu.", jp:"この味噌汁はおいしいです。", fr:"Cette soupe miso est délicieuse.", t:["Kono","misoshiru","wa","oishii","desu"] },
    { r:"Watashi wa niku o tabemasen.", jp:"私は肉を食べません。", fr:"Je ne mange pas de viande.", t:["Watashi","wa","niku","o","tabemasen"] },
    { r:"Mizu o ippai onegaishimasu.", jp:"水を一杯お願いします。", fr:"Un verre d'eau, s'il vous plaît.", t:["Mizu","o","ippai","onegaishimasu"] },
    { r:"Kore wa ikura desu ka.", jp:"これはいくらですか。", fr:"Combien coûte ceci ?", t:["Kore","wa","ikura","desu","ka"] },
  ],
  conj: [
    { q:"« deux (objets) » en japonais", hint:"série hitotsu, futatsu…", a:["futatsu"] },
    { q:"« deux personnes »", hint:"compteur -nin, forme irrégulière", a:["futari"] },
    { q:"Bīru o mittsu ___.", hint:"« s'il vous plaît » à la commande", a:["kudasai"] },
    { q:"« trois (objets) »", hint:"après futatsu", a:["mittsu"] },
  ],
  quiz: [
    { q:"En quelle année le washoku entre-t-il au patrimoine de l'UNESCO ?", o:["2013","1998","2020"], a:0 },
    { q:"Qui a identifié l'umami ?", o:["Kikunae Ikeda, en 1908","Sen no Rikyū, au XVIe siècle","Katsushika Hokusai"], a:0 },
    { q:"Pourquoi ne plante-t-on pas ses baguettes dans le riz ?", o:["C'est le geste des offrandes aux défunts","Cela abîme le riz","C'est réservé aux enfants"], a:0 },
  ],
},
{
  id: "l11", theme: "arts", title: "Le cinéma et l'animation", jp: "映画とアニメ", r: "eiga to anime",
  culture: [
    "En <b>1951</b>, <i>Rashōmon</i> d'<b>Akira Kurosawa</b> remporte le Lion d'or à Venise et fait découvrir le cinéma japonais à l'Occident. Yasujirō Ozu, avec <i>Voyage à Tokyo</i> (1953), filme au contraire l'ordinaire d'une famille, caméra posée à hauteur de tatami.",
    "Le <b>studio Ghibli</b> est fondé en <b>1985</b> par Hayao Miyazaki, Isao Takahata et Toshio Suzuki. <i>Le Voyage de Chihiro</i> reçoit l'Ours d'or à Berlin en 2002, puis l'Oscar du meilleur film d'animation en 2003.",
    "L'<b>anime</b> irrigue aujourd'hui toute la culture populaire mondiale, et le <b>manga</b> représente une part majoritaire de l'édition japonaise. Beaucoup de séries paraissent d'abord dans des hebdomadaires épais, imprimés sur papier recyclé, lus puis laissés dans le train."
  ],
  vocab: [
    ["eiga","映画","えいが","film"],
    ["anime","アニメ","アニメ","dessin animé"],
    ["kantoku","監督","かんとく","réalisateur"],
    ["monogatari","物語","ものがたり","récit, histoire"],
    ["omoshiroi","面白い","おもしろい","intéressant, drôle"],
    ["kanashii","悲しい","かなしい","triste"],
    ["yūmei","有名","ゆうめい","célèbre"],
    ["ichiban","一番","いちばん","le plus, numéro un"],
    ["yori","より","より","que (dans la comparaison)"],
    ["hō","方","ほう","côté, celui-ci (comparaison)"],
  ],
  kanji: ["映","画","見","語"],
  grammar: {
    title: "Comparer : yori, no hō ga, ichiban",
    explain: [
      "« A est plus … que B » se dit <b>A wa B yori … desu</b> : <i>Eiga wa hon yori omoshiroi desu</i>, le film est plus intéressant que le livre.",
      "Pour répondre à une question de préférence, on emploie <b>no hō ga</b> : <i>Anime no hō ga suki desu</i>, je préfère l'animation.",
      "Le superlatif est <b>ichiban</b>, placé devant l'adjectif : <i>Kono eiga ga ichiban yūmei desu</i>, ce film est le plus célèbre. Dans un groupe : <i>… no naka de ichiban …</i>"
    ],
    table: { head: ["Structure", "Exemple", "Sens"], rows: [
      ["A wa B yori …", "eiga wa hon yori nagai", "le film est plus long que le livre"],
      ["A no hō ga …", "anime no hō ga suki", "je préfère l'animation"],
      ["ichiban …", "ichiban yūmei na kantoku", "le réalisateur le plus célèbre"],
      ["… no naka de", "nihon no eiga no naka de", "parmi les films japonais"],
    ]},
  },
  sentences: [
    { r:"Kono eiga wa ano eiga yori omoshiroi desu.", jp:"この映画はあの映画より面白いです。", fr:"Ce film est plus intéressant que celui-là.", t:["Kono","eiga","wa","ano","eiga","yori","omoshiroi","desu"] },
    { r:"Anime no hō ga suki desu.", jp:"アニメの方が好きです。", fr:"Je préfère l'animation.", t:["Anime","no hō ga","suki","desu"] },
    { r:"Kurosawa wa ichiban yūmei na kantoku desu.", jp:"黒澤は一番有名な監督です。", fr:"Kurosawa est le réalisateur le plus célèbre.", t:["Kurosawa","wa","ichiban","yūmei na","kantoku","desu"], say:"くろさわはいちばんゆうめいなかんとくです。" },
    { r:"Kono monogatari wa sukoshi kanashii desu.", jp:"この物語は少し悲しいです。", fr:"Cette histoire est un peu triste.", t:["Kono","monogatari","wa","sukoshi","kanashii","desu"] },
    { r:"Nihon no eiga o mitai desu.", jp:"日本の映画を見たいです。", fr:"Je veux voir des films japonais.", t:["Nihon","no","eiga","o","mitai desu"] },
  ],
  conj: [
    { q:"Eiga wa hon ___ omoshiroi desu.", hint:"« plus … que »", a:["yori"] },
    { q:"Anime ___ suki desu.", hint:"« je préfère » (deux mots)", a:["no hō ga","no hou ga","no ho ga"] },
    { q:"Kono eiga ga ___ yūmei desu.", hint:"le superlatif", a:["ichiban"] },
    { q:"omoshiroi → négatif", hint:"adjectif en -i", a:["omoshirokunai desu","omoshirokunai"] },
  ],
  quiz: [
    { q:"Quel film a valu à Kurosawa le Lion d'or en 1951 ?", o:["Rashōmon","Voyage à Tokyo","Le Voyage de Chihiro"], a:0 },
    { q:"En quelle année le studio Ghibli est-il fondé ?", o:["1985","1963","2001"], a:0 },
    { q:"Comment Ozu filme-t-il ses scènes de famille ?", o:["Caméra posée à hauteur de tatami","Caméra à l'épaule","En plans aériens"], a:0 },
  ],
},
{
  id: "l12", theme: "societe", title: "Kami et bouddhas", jp: "神様と仏様", r: "kamisama to hotokesama",
  culture: [
    "Le <b>shintō</b> — « la voie des kami » — n'a ni fondateur ni texte sacré unique. Il honore les <b>kami</b>, présences qui habitent une montagne, une cascade, un arbre ou un ancêtre ; la formule consacrée en compte <i>yaoyorozu</i>, « huit millions », c'est-à-dire une infinité.",
    "Le <b>bouddhisme</b> arrive de Chine et de Corée au milieu du <b>VIe siècle</b>. Les deux traditions ne se sont pas remplacées : on se marie souvent au sanctuaire et on est enterré au temple. Le Japon compte environ 80 000 sanctuaires et autant de temples.",
    "Au sanctuaire, on se rince les mains et la bouche à la fontaine, on jette une pièce, on s'incline deux fois, on frappe deux fois dans ses mains, on prie, on s'incline une dernière fois. Le <b>torii</b> rouge marque le passage du monde ordinaire à l'espace sacré ; l'<b>omikuji</b>, le petit oracle tiré au sort, s'attache à une branche s'il annonce le malheur."
  ],
  vocab: [
    ["kami","神","かみ","divinité, kami"],
    ["jinja","神社","じんじゃ","sanctuaire shintō"],
    ["otera","お寺","おてら","temple bouddhique"],
    ["torii","鳥居","とりい","portail du sanctuaire"],
    ["omikuji","おみくじ","おみくじ","oracle tiré au sort"],
    ["inorimasu","祈ります","いのります","prier"],
    ["shinjimasu","信じます","しんじます","croire"],
    ["shizen","自然","しぜん","nature"],
    ["dekimasu","できます","できます","pouvoir, savoir faire"],
    ["shōgatsu","正月","しょうがつ","Nouvel An"],
  ],
  kanji: ["神","祈","寺","心"],
  grammar: {
    title: "Pouvoir : dekimasu et ~koto ga dekimasu",
    explain: [
      "<b>dekimasu</b> seul signifie « savoir faire, être possible » : <i>Nihongo ga dekimasu</i>, je sais le japonais. Ce qu'on sait faire est marqué par <b>ga</b>.",
      "Avec un verbe, on emploie la <b>forme du dictionnaire</b> (la forme neutre : <i>nomu, taberu, miru, suru, kuru</i>) suivie de <b>koto ga dekimasu</b> : <i>kanji o kaku koto ga dekimasu</i>, je sais écrire les kanji.",
      "La forme du dictionnaire se retrouve en retirant <b>-masu</b> : -imasu → -u (nomimasu → nomu), groupe 2 → -ru (tabemasu → taberu). Irréguliers : shimasu → suru, kimasu → kuru."
    ],
    table: { head: ["Poli", "Dictionnaire", "Pouvoir"], rows: [
      ["nomimasu", "nomu", "nomu koto ga dekimasu"],
      ["tabemasu", "taberu", "taberu koto ga dekimasu"],
      ["ikimasu", "iku", "iku koto ga dekimasu"],
      ["shimasu", "suru", "suru koto ga dekimasu"],
    ]},
  },
  sentences: [
    { r:"Jinja de omikuji o hikimasu.", jp:"神社でおみくじを引きます。", fr:"Au sanctuaire, on tire un omikuji.", t:["Jinja","de","omikuji","o","hikimasu"] },
    { r:"Nihongo ga sukoshi dekimasu.", jp:"日本語が少しできます。", fr:"Je sais un peu le japonais.", t:["Nihongo","ga","sukoshi","dekimasu"] },
    { r:"Kanji o kaku koto ga dekimasu.", jp:"漢字を書くことができます。", fr:"Je sais écrire les kanji.", t:["Kanji","o","kaku","koto ga dekimasu"] },
    { r:"Shōgatsu ni jinja ni ikimasu.", jp:"正月に神社に行きます。", fr:"Au Nouvel An, on va au sanctuaire.", t:["Shōgatsu","ni","jinja","ni","ikimasu"] },
    { r:"Nihon-jin wa shizen no kami o shinjimasu.", jp:"日本人は自然の神を信じます。", fr:"Les Japonais croient aux kami de la nature.", t:["Nihon-jin","wa","shizen","no","kami","o","shinjimasu"] },
  ],
  conj: [
    { q:"tabemasu → forme du dictionnaire", hint:"groupe 2", a:["taberu"] },
    { q:"nomimasu → forme du dictionnaire", hint:"-imasu → -u", a:["nomu"] },
    { q:"shimasu → forme du dictionnaire", hint:"irrégulier", a:["suru"] },
    { q:"Nihongo ___ dekimasu.", hint:"particule de ce qu'on sait faire", a:["ga"] },
  ],
  quiz: [
    { q:"Que veut dire « yaoyorozu no kami » ?", o:["Huit millions de kami, c'est-à-dire une infinité","Les huit kami principaux","Les kami de la montagne"], a:0 },
    { q:"Quand le bouddhisme arrive-t-il au Japon ?", o:["Au milieu du VIe siècle","En 1868","Au XIIe siècle"], a:0 },
    { q:"Que fait-on d'un omikuji défavorable ?", o:["On l'attache à une branche","On le garde dans son portefeuille","On le brûle chez soi"], a:0 },
  ],
},
{
  id: "l13", theme: "societe", title: "L'école", jp: "学校", r: "gakkō",
  culture: [
    "L'année scolaire commence en <b>avril</b>, sous les cerisiers, et se termine en mars. Le cursus suit le rythme <b>6-3-3</b> : six ans de primaire, trois de collège, trois de lycée — les neuf premières années étant obligatoires.",
    "Il n'y a presque pas de personnel de ménage : chaque jour, les élèves font le <b>sōji</b>, le nettoyage de leur salle et des couloirs. Après les cours viennent les <b>bukatsu</b>, les clubs sportifs ou culturels, souvent quotidiens, et pour beaucoup le <b>juku</b>, l'école du soir qui prépare les concours d'entrée.",
    "Le <b>senpai</b> (l'aîné) et le <b>kōhai</b> (le cadet) structurent toute la vie de groupe, du club de baseball au bureau. C'est à l'école que s'apprennent ces places."
  ],
  vocab: [
    ["gakkō","学校","がっこう","école"],
    ["kyōshitsu","教室","きょうしつ","salle de classe"],
    ["jugyō","授業","じゅぎょう","cours"],
    ["shukudai","宿題","しゅくだい","devoirs"],
    ["seito","生徒","せいと","élève"],
    ["senpai","先輩","せんぱい","aîné, ancien"],
    ["yomimasu","読みます","よみます","lire"],
    ["kakimasu","書きます","かきます","écrire"],
    ["oboemasu","覚えます","おぼえます","apprendre par cœur"],
    ["muzukashii","難しい","むずかしい","difficile"],
    ["yasashii","やさしい","やさしい","facile, doux"],
  ],
  kanji: ["校","教","室","読"],
  grammar: {
    title: "Devoir et avoir le droit",
    explain: [
      "L'obligation se construit sur la <b>forme négative neutre</b> : on remplace <b>-masen</b> par <b>-nakereba narimasen</b>. <i>Shukudai o shinakereba narimasen</i> — je dois faire mes devoirs. À l'oral, on entend souvent la version courte <i>-nakya</i>.",
      "La permission emploie la forme en <b>-te</b> suivie de <b>mo ii desu</b> : <i>Kaette mo ii desu ka</i> — puis-je rentrer ?",
      "L'interdiction en est le miroir : <b>-te wa ikemasen</b>. <i>Koko de tabete wa ikemasen</i> — on ne mange pas ici."
    ],
    table: { head: ["Verbe", "Je dois", "J'ai le droit"], rows: [
      ["shimasu", "shinakereba narimasen", "shite mo ii desu"],
      ["ikimasu", "ikanakereba narimasen", "itte mo ii desu"],
      ["yomimasu", "yomanakereba narimasen", "yonde mo ii desu"],
      ["tabemasu", "tabenakereba narimasen", "tabete mo ii desu"],
    ]},
  },
  sentences: [
    { r:"Maiasa, gakkō ni ikanakereba narimasen.", jp:"毎朝、学校に行かなければなりません。", fr:"Chaque matin, je dois aller à l'école.", t:["Maiasa","gakkō","ni","ikanakereba narimasen"] },
    { r:"Kyōshitsu de shukudai o shite mo ii desu ka.", jp:"教室で宿題をしてもいいですか。", fr:"Puis-je faire mes devoirs dans la salle ?", t:["Kyōshitsu","de","shukudai","o","shite mo ii desu","ka"] },
    { r:"Kanji wa muzukashii desu ga, omoshiroi desu.", jp:"漢字は難しいですが、面白いです。", fr:"Les kanji sont difficiles, mais intéressants.", t:["Kanji","wa","muzukashii desu","ga","omoshiroi desu"] },
    { r:"Seito wa mainichi sōji o shimasu.", jp:"生徒は毎日掃除をします。", fr:"Les élèves font le ménage tous les jours.", t:["Seito","wa","mainichi","sōji","o","shimasu"] },
    { r:"Hon o yonde mo ii desu.", jp:"本を読んでもいいです。", fr:"Tu peux lire le livre.", t:["Hon","o","yonde mo ii desu"] },
  ],
  conj: [
    { q:"shimasu → je dois", hint:"obligation polie", a:["shinakereba narimasen"] },
    { q:"ikimasu → j'ai le droit", hint:"permission", a:["itte mo ii desu","ittemo ii desu"] },
    { q:"tabemasu → interdiction", hint:"« on ne mange pas »", a:["tabete wa ikemasen"] },
    { q:"yomimasu → je dois", hint:"obligation polie", a:["yomanakereba narimasen"] },
  ],
  quiz: [
    { q:"Quand commence l'année scolaire ?", o:["En avril","En septembre","En janvier"], a:0 },
    { q:"Qui nettoie les salles de classe ?", o:["Les élèves eux-mêmes","Une société de ménage","Les professeurs"], a:0 },
    { q:"Qu'est-ce qu'un juku ?", o:["Une école du soir pour préparer les concours","Un club de sport","Un voyage scolaire"], a:0 },
  ],
},
{
  id: "l14", theme: "politique", title: "L'économie", jp: "経済", r: "keizai",
  culture: [
    "De 1955 à 1973, le Japon connaît une croissance à deux chiffres : c'est le « miracle économique ». Les usines inventent le <b>kaizen</b>, l'amélioration continue par petits pas, et le <i>juste-à-temps</i> de Toyota, méthodes aujourd'hui enseignées partout.",
    "À la fin des années 1980, la spéculation sur les terrains et les actions gonfle une <b>bulle</b> démesurée — on a pu dire que le seul parc du palais impérial valait autant que toute la Californie. Elle éclate en <b>1991</b> et ouvre deux décennies de croissance faible.",
    "Le défi actuel est démographique : la population diminue depuis le début des années 2010 et près de <b>30 %</b> des habitants ont plus de 65 ans. D'où les robots de service, l'automatisation des caisses, et un débat permanent sur l'immigration de travail."
  ],
  vocab: [
    ["keizai","経済","けいざい","économie"],
    ["kaisha","会社","かいしゃ","entreprise"],
    ["okane","お金","おかね","argent"],
    ["kaimasu","買います","かいます","acheter"],
    ["urimasu","売ります","うります","vendre"],
    ["nedan","値段","ねだん","prix"],
    ["takai","高い","たかい","cher"],
    ["yasui","安い","やすい","bon marché"],
    ["kōjō","工場","こうじょう","usine"],
    ["kara","から","から","parce que, depuis"],
    ["node","ので","ので","comme, étant donné que"],
  ],
  kanji: ["買","売","安","高"],
  grammar: {
    title: "Dire la cause : kara, node, ga",
    explain: [
      "<b>kara</b> se place après la proposition qui donne la raison : <i>Takai desu kara, kaimasen</i> — c'est cher, donc je n'achète pas. L'ordre est l'inverse du français : la cause d'abord, la conséquence ensuite.",
      "<b>node</b> a le même rôle, en plus doux et plus poli : on l'emploie pour s'excuser ou expliquer sans insister. Après un nom ou un adjectif en -na, il devient <b>na node</b>.",
      "<b>ga</b> en fin de proposition marque l'opposition : <i>Yasui desu ga, warui desu</i> — c'est bon marché, mais c'est mauvais."
    ],
    table: { head: ["Lien", "Exemple", "Sens"], rows: [
      ["… kara", "takai desu kara", "parce que c'est cher"],
      ["… node", "takai node", "comme c'est cher"],
      ["nom + na node", "byōki na node", "comme je suis malade"],
      ["… ga", "takai desu ga", "c'est cher, mais…"],
    ]},
  },
  sentences: [
    { r:"Takai desu kara, kaimasen.", jp:"高いですから、買いません。", fr:"C'est cher, donc je n'achète pas.", t:["Takai desu","kara","kaimasen"] },
    { r:"Yasui node, futatsu kaimashita.", jp:"安いので、二つ買いました。", fr:"Comme c'était bon marché, j'en ai acheté deux.", t:["Yasui","node","futatsu","kaimashita"] },
    { r:"Kono kaisha wa kuruma o tsukutte imasu.", jp:"この会社は車を作っています。", fr:"Cette entreprise fabrique des voitures.", t:["Kono","kaisha","wa","kuruma","o","tsukutte imasu"] },
    { r:"Nedan wa takai desu ga, ii desu.", jp:"値段は高いですが、いいです。", fr:"Le prix est élevé, mais c'est bien.", t:["Nedan","wa","takai desu","ga","ii desu"] },
    { r:"Nihon no keizai wa kawarimashita.", jp:"日本の経済は変わりました。", fr:"L'économie japonaise a changé.", t:["Nihon","no","keizai","wa","kawarimashita"] },
  ],
  conj: [
    { q:"Takai desu ___, kaimasen.", hint:"« parce que »", a:["kara"] },
    { q:"Yasui ___, kaimashita.", hint:"« comme », plus doux", a:["node"] },
    { q:"Takai desu ___, ii desu.", hint:"« mais »", a:["ga"] },
    { q:"kaimasu → passé", hint:"« j'ai acheté »", a:["kaimashita"] },
  ],
  quiz: [
    { q:"Que désigne le kaizen ?", o:["L'amélioration continue par petits pas","Le salaire à l'ancienneté","La bulle spéculative"], a:0 },
    { q:"Quand la bulle éclate-t-elle ?", o:["En 1991","En 1973","En 2008"], a:0 },
    { q:"Quel est le grand défi actuel ?", o:["Le vieillissement et la baisse de la population","Le manque de terres agricoles","L'absence d'industrie"], a:0 },
  ],
},
{
  id: "l15", theme: "histoire", title: "Le shinkansen", jp: "新幹線", r: "shinkansen",
  culture: [
    "Le <b>1er octobre 1964</b>, neuf jours avant l'ouverture des Jeux olympiques de Tōkyō, le premier shinkansen relie Tōkyō à Ōsaka. Le pays, détruit vingt ans plus tôt, montre au monde un train qui roule à 210 km/h sur une voie entièrement neuve.",
    "Le réseau dépasse aujourd'hui les 3 000 kilomètres et atteint <b>320 km/h</b> sur la ligne du Tōhoku. Le retard moyen se compte en secondes, et aucun accident mortel de passager n'est survenu par déraillement ou collision sur ces lignes depuis l'ouverture.",
    "À la gare, on achète un <b>ekiben</b> — le bento propre à chaque ville — et on s'aligne sur les marques peintes au sol : les portes s'arrêteront exactement là. Les sièges pivotent à chaque terminus pour faire face à la marche."
  ],
  vocab: [
    ["densha","電車","でんしゃ","train"],
    ["eki","駅","えき","gare"],
    ["kippu","切符","きっぷ","billet"],
    ["michi","道","みち","route, chemin"],
    ["norimasu","乗ります","のります","monter dans"],
    ["orimasu","降ります","おります","descendre de"],
    ["hayai","速い","はやい","rapide"],
    ["osoi","遅い","おそい","lent, tardif"],
    ["ekiben","駅弁","えきべん","bento de gare"],
    ["koto ga arimasu","ことがあります","ことがあります","il m'est arrivé de"],
  ],
  kanji: ["駅","電","車","道"],
  grammar: {
    title: "L'expérience : ~ta koto ga arimasu",
    explain: [
      "Pour dire « j'ai déjà fait », on prend la <b>forme neutre passée</b> (la forme en -ta) et on ajoute <b>koto ga arimasu</b> : <i>Shinkansen ni notta koto ga arimasu</i> — j'ai déjà pris le shinkansen.",
      "La forme en -ta s'obtient à partir de la forme en -te : <i>notte → notta</i>, <i>tabete → tabeta</i>, <i>itte → itta</i>, <i>shite → shita</i>.",
      "<b>~te kara</b> enchaîne deux actions dans le temps : <i>Kippu o katte kara, densha ni norimasu</i> — après avoir acheté le billet, je monte dans le train."
    ],
    table: { head: ["Forme -te", "Forme -ta", "Expérience"], rows: [
      ["notte", "notta", "notta koto ga arimasu"],
      ["tabete", "tabeta", "tabeta koto ga arimasu"],
      ["itte", "itta", "itta koto ga arimasu"],
      ["mite", "mita", "mita koto ga arimasu"],
    ]},
  },
  sentences: [
    { r:"Shinkansen ni notta koto ga arimasu ka.", jp:"新幹線に乗ったことがありますか。", fr:"As-tu déjà pris le shinkansen ?", t:["Shinkansen","ni","notta","koto ga arimasu","ka"] },
    { r:"Kippu o katte kara, eki ni ikimasu.", jp:"切符を買ってから、駅に行きます。", fr:"Après avoir acheté le billet, je vais à la gare.", t:["Kippu","o","katte kara","eki","ni","ikimasu"] },
    { r:"Kono densha wa totemo hayai desu.", jp:"この電車はとても速いです。", fr:"Ce train est très rapide.", t:["Kono","densha","wa","totemo","hayai","desu"] },
    { r:"Ekiben o tabeta koto ga arimasen.", jp:"駅弁を食べたことがありません。", fr:"Je n'ai jamais mangé d'ekiben.", t:["Ekiben","o","tabeta","koto ga arimasen"] },
    { r:"Tsugi no eki de orimasu.", jp:"次の駅で降ります。", fr:"Je descends à la prochaine gare.", t:["Tsugi","no","eki","de","orimasu"] },
  ],
  conj: [
    { q:"norimasu → forme en -ta", hint:"à partir de notte", a:["notta"] },
    { q:"tabemasu → forme en -ta", hint:"groupe 2", a:["tabeta"] },
    { q:"ikimasu → « j'y suis déjà allé »", hint:"forme -ta + koto ga arimasu", a:["itta koto ga arimasu"] },
    { q:"shimasu → forme en -ta", hint:"irrégulier", a:["shita"] },
  ],
  quiz: [
    { q:"Quand le premier shinkansen circule-t-il ?", o:["Le 1er octobre 1964","En 1945","En 1988"], a:0 },
    { q:"Quelle vitesse atteint-il aujourd'hui au maximum ?", o:["320 km/h","210 km/h","500 km/h"], a:0 },
    { q:"Qu'est-ce qu'un ekiben ?", o:["Le bento vendu dans une gare","Un abonnement de train","Le quai réservé au shinkansen"], a:0 },
  ],
},
{
  id: "l16", theme: "societe", title: "Le bain", jp: "お風呂と温泉", r: "ofuro to onsen",
  culture: [
    "Sur un archipel volcanique, l'eau chaude sort du sol : le Japon compte plus de <b>27 000</b> sources thermales et quelque 3 000 stations d'<b>onsen</b>. La loi de 1948 en donne une définition précise — au moins 25 °C à la source, ou une teneur suffisante en certains minéraux.",
    "Le bain n'est pas un moment de toilette mais de délassement : on se lave assis, à l'extérieur du bassin, on se rince entièrement, puis on entre dans l'eau très chaude. L'eau du <b>furo</b> familial se garde d'ailleurs pour toute la maisonnée, dans l'ordre des âges.",
    "Les <b>sentō</b>, bains publics de quartier, se raréfient depuis que chaque logement a sa salle de bains, mais gardent leur fresque du mont Fuji au-dessus des bassins. Dans certains établissements, les tatouages restent mal vus — usage hérité de leur association avec la pègre."
  ],
  vocab: [
    ["ofuro","お風呂","おふろ","bain"],
    ["onsen","温泉","おんせん","source chaude"],
    ["sentō","銭湯","せんとう","bain public"],
    ["oyu","お湯","おゆ","eau chaude"],
    ["karada","体","からだ","corps"],
    ["atsui","熱い","あつい","chaud (au toucher)"],
    ["kimochii","気持ちいい","きもちいい","agréable"],
    ["hairimasu","入ります","はいります","entrer"],
    ["araimasu","洗います","あらいます","laver"],
    ["omoimasu","思います","おもいます","penser"],
    ["tabun","たぶん","たぶん","sans doute"],
  ],
  kanji: ["体","湯","気","水"],
  grammar: {
    title: "Donner son avis : ~to omoimasu",
    explain: [
      "Pour dire ce qu'on pense, on met la phrase à la <b>forme neutre</b> puis on ajoute <b>to omoimasu</b> : <i>Onsen wa ii to omoimasu</i> — je pense que les onsen, c'est bien.",
      "Devant <b>to</b>, <i>desu</i> devient <b>da</b> : <i>kirei da to omoimasu</i>. Avec un adjectif en -i, rien ne change : <i>atsui to omoimasu</i>.",
      "La forme neutre des verbes est la forme du dictionnaire ; au négatif, <b>-nai</b> : <i>ikanai to omoimasu</i> — je pense qu'il n'ira pas."
    ],
    table: { head: ["Phrase", "Forme neutre", "Avec to omoimasu"], rows: [
      ["ii desu", "ii", "ii to omoimasu"],
      ["kirei desu", "kirei da", "kirei da to omoimasu"],
      ["ikimasu", "iku", "iku to omoimasu"],
      ["ikimasen", "ikanai", "ikanai to omoimasu"],
    ]},
  },
  sentences: [
    { r:"Onsen wa kimochii to omoimasu.", jp:"温泉は気持ちいいと思います。", fr:"Je trouve les onsen très agréables.", t:["Onsen","wa","kimochii","to omoimasu"] },
    { r:"Karada o aratte kara, ofuro ni hairimasu.", jp:"体を洗ってから、お風呂に入ります。", fr:"On se lave, puis on entre dans le bain.", t:["Karada","o","aratte kara","ofuro","ni","hairimasu"] },
    { r:"Kono oyu wa atsui desu ne.", jp:"このお湯は熱いですね。", fr:"Cette eau est chaude, n'est-ce pas ?", t:["Kono","oyu","wa","atsui desu","ne"] },
    { r:"Tabun ashita wa ame da to omoimasu.", jp:"たぶん明日は雨だと思います。", fr:"Je pense qu'il pleuvra sans doute demain.", t:["Tabun","ashita","wa","ame da","to omoimasu"] },
    { r:"Sentō ni itta koto ga arimasu.", jp:"銭湯に行ったことがあります。", fr:"Je suis déjà allé dans un bain public.", t:["Sentō","ni","itta","koto ga arimasu"] },
  ],
  conj: [
    { q:"ii desu → « je pense que c'est bien »", hint:"forme neutre + to omoimasu", a:["ii to omoimasu"] },
    { q:"kirei desu → forme neutre", hint:"desu devient…", a:["kirei da"] },
    { q:"ikimasen → forme neutre négative", hint:"-masen → -nai", a:["ikanai"] },
    { q:"Karada o ___ kara, hairimasu.", hint:"« après avoir lavé » (araimasu)", a:["aratte"] },
  ],
  quiz: [
    { q:"Que dit la loi sur ce qu'est un onsen ?", o:["Au moins 25 °C à la source, ou assez de minéraux","Qu'il doit être en plein air","Qu'il doit être naturel et gratuit"], a:0 },
    { q:"Où se lave-t-on ?", o:["Assis, à l'extérieur du bassin","Dans le bassin","Sous la douche après le bain"], a:0 },
    { q:"Qu'est-ce qu'un sentō ?", o:["Un bain public de quartier","Une source volcanique","Une auberge traditionnelle"], a:0 },
  ],
},
{
  id: "l17", theme: "societe", title: "Offrir", jp: "贈り物", r: "okurimono",
  culture: [
    "Le cadeau règle une bonne part des relations sociales. En rentrant de voyage, on rapporte un <b>omiyage</b> pour ses collègues — presque toujours une boîte de gâteaux emballés à l'unité, spécialité de la région visitée, à partager au bureau.",
    "Deux saisons d'échanges rythment l'année : l'<b>ochūgen</b> en juillet et l'<b>oseibo</b> en décembre, envoyés à ceux dont on a reçu de l'aide. Au Nouvel An, les enfants reçoivent l'<b>otoshidama</b>, de l'argent glissé dans une petite enveloppe décorée.",
    "L'emballage compte autant que le contenu : le <b>furoshiki</b>, carré de tissu noué, sert de paquet réutilisable. On évite les ensembles de quatre, parce que <i>shi</i> — quatre — se prononce comme la mort, et l'on offre des deux mains, en s'excusant presque de la modestie du présent."
  ],
  vocab: [
    ["okurimono","贈り物","おくりもの","cadeau"],
    ["omiyage","お土産","おみやげ","souvenir rapporté de voyage"],
    ["otoshidama","お年玉","おとしだま","étrennes du Nouvel An"],
    ["furoshiki","風呂敷","ふろしき","tissu d'emballage"],
    ["agemasu","あげます","あげます","donner (à quelqu'un)"],
    ["moraimasu","もらいます","もらいます","recevoir"],
    ["kuremasu","くれます","くれます","me donner"],
    ["okurimasu","送ります","おくります","envoyer"],
    ["orei","お礼","おれい","remerciement"],
    ["kazoku","家族","かぞく","famille"],
    ["ureshii","嬉しい","うれしい","heureux, content"],
  ],
  kanji: ["送","品","礼","正"],
  grammar: {
    title: "Donner et recevoir : agemasu, moraimasu, kuremasu",
    explain: [
      "Le japonais distingue le sens du don. <b>agemasu</b> : je donne à quelqu'un (<i>tomodachi ni hon o agemasu</i>). <b>moraimasu</b> : je reçois de quelqu'un (<i>tomodachi ni hon o moraimasu</i>). <b>kuremasu</b> : quelqu'un me donne (<i>tomodachi ga hon o kuremasu</i>).",
      "La différence entre <i>agemasu</i> et <i>kuremasu</i> tient au point de vue : le verbe change selon que le cadeau s'éloigne de moi ou vient vers moi. On ne dit jamais <i>watashi ni agemasu</i>.",
      "Avec la forme en -te, ces verbes disent le service rendu : <b>-te agemasu</b> (je rends service), <b>-te moraimasu</b> (on me rend service), <b>-te kuremasu</b> (quelqu'un fait cela pour moi)."
    ],
    table: { head: ["Verbe", "Qui donne", "Exemple"], rows: [
      ["agemasu", "moi → quelqu'un", "imōto ni agemasu"],
      ["moraimasu", "je reçois de", "sensei ni moraimasu"],
      ["kuremasu", "quelqu'un → moi", "haha ga kuremasu"],
      ["-te kuremasu", "on le fait pour moi", "oshiete kuremasu"],
    ]},
  },
  sentences: [
    { r:"Tomodachi ni omiyage o agemasu.", jp:"友達にお土産をあげます。", fr:"J'offre un souvenir à un ami.", t:["Tomodachi","ni","omiyage","o","agemasu"] },
    { r:"Sensei ni hon o moraimashita.", jp:"先生に本をもらいました。", fr:"J'ai reçu un livre du professeur.", t:["Sensei","ni","hon","o","moraimashita"] },
    { r:"Haha ga otoshidama o kuremashita.", jp:"母がお年玉をくれました。", fr:"Ma mère m'a donné mes étrennes.", t:["Haha","ga","otoshidama","o","kuremashita"] },
    { r:"Kazoku ni tegami o okurimasu.", jp:"家族に手紙を送ります。", fr:"J'envoie une lettre à ma famille.", t:["Kazoku","ni","tegami","o","okurimasu"] },
    { r:"Tanaka-san ga nihongo o oshiete kuremasu.", jp:"田中さんが日本語を教えてくれます。", fr:"Monsieur Tanaka m'enseigne le japonais.", t:["Tanaka-san","ga","nihongo","o","oshiete kuremasu"] },
  ],
  conj: [
    { q:"Tomodachi ___ hon o agemasu.", hint:"le destinataire", a:["ni"] },
    { q:"Haha ga okane o ___.", hint:"« m'a donné »", a:["kuremashita"] },
    { q:"Sensei ni ___.", hint:"« j'ai reçu »", a:["moraimashita"] },
    { q:"oshiemasu → « il me l'enseigne »", hint:"-te + kuremasu", a:["oshiete kuremasu"] },
  ],
  quiz: [
    { q:"Qu'est-ce qu'un omiyage ?", o:["Un souvenir rapporté pour les autres","Un cadeau d'anniversaire","Une enveloppe de mariage"], a:0 },
    { q:"Que reçoivent les enfants au Nouvel An ?", o:["L'otoshidama, de l'argent en enveloppe","Un furoshiki","Une carte de vœux"], a:0 },
    { q:"Pourquoi éviter un ensemble de quatre ?", o:["« Shi », quatre, se dit comme la mort","Quatre porte malheur aux commerçants","C'est trop cher"], a:0 },
  ],
},
{
  id: "l18", theme: "histoire", title: "Quand la terre tremble", jp: "地震と防災", r: "jishin to bōsai",
  culture: [
    "L'archipel se trouve à la rencontre de quatre plaques tectoniques : il concentre une part considérable des séismes de forte magnitude de la planète. Le <b>1er septembre 1923</b>, le séisme du Kantō détruit Tōkyō et Yokohama et fait environ 105 000 morts ; la date est devenue la journée nationale de prévention.",
    "Deux autres dates ont tout changé. <b>1995</b>, Kōbe : 6 434 morts, et une prise de conscience sur les normes de construction. <b>Le 11 mars 2011</b>, un séisme de magnitude 9,0 au large du Tōhoku déclenche un tsunami qui fait près de 20 000 morts ou disparus et provoque l'accident nucléaire de Fukushima.",
    "D'où une culture de la préparation : alertes envoyées sur les téléphones quelques secondes avant l'onde destructrice, exercices d'évacuation à l'école et au bureau, sac d'urgence prêt à l'entrée, immeubles montés sur amortisseurs. Le premier réflexe enseigné : se protéger la tête, s'éloigner des fenêtres, puis gagner les hauteurs si la mer est proche."
  ],
  vocab: [
    ["jishin","地震","じしん","séisme"],
    ["tsunami","津波","つなみ","tsunami"],
    ["bōsai","防災","ぼうさい","prévention des catastrophes"],
    ["hinan","避難","ひなん","évacuation"],
    ["abunai","危ない","あぶない","dangereux"],
    ["tasukemasu","助けます","たすけます","aider, secourir"],
    ["nigemasu","逃げます","にげます","fuir, s'échapper"],
    ["yureru","揺れます","ゆれます","trembler"],
    ["anzen","安全","あんぜん","sécurité"],
    ["tsukue","机","つくえ","bureau, table"],
    ["sugu ni","すぐに","すぐに","tout de suite"],
  ],
  kanji: ["地","震","助","防"],
  grammar: {
    title: "Si, quand : ~tara",
    explain: [
      "<b>~tara</b> se forme sur la forme en -ta, à laquelle on ajoute <b>-ra</b> : <i>jishin ga kitara</i> — s'il y a un séisme, quand il y aura un séisme. Le japonais ne distingue pas les deux.",
      "La proposition principale suit : <i>Jishin ga kitara, tsukue no shita ni hairimasu</i> — en cas de séisme, on se met sous la table.",
      "Avec un nom ou un adjectif en -na, on emploie <b>dattara</b> : <i>abunai dattara</i>… Avec un adjectif en -i, le -i devient <b>-kattara</b> : <i>takakattara kaimasen</i> — si c'est cher, je n'achète pas."
    ],
    table: { head: ["Forme", "Avec ~tara", "Sens"], rows: [
      ["kimasu", "kitara", "si/quand ça vient"],
      ["mimasu", "mitara", "si/quand je vois"],
      ["takai", "takakattara", "si c'est cher"],
      ["anzen desu", "anzen dattara", "si c'est sûr"],
    ]},
  },
  sentences: [
    { r:"Jishin ga kitara, tsukue no shita ni hairimasu.", jp:"地震が来たら、机の下に入ります。", fr:"En cas de séisme, on se met sous la table.", t:["Jishin","ga","kitara","tsukue no shita","ni","hairimasu"] },
    { r:"Abunai desu kara, sugu ni nigete kudasai.", jp:"危ないですから、すぐに逃げてください。", fr:"C'est dangereux, fuyez tout de suite.", t:["Abunai desu","kara","sugu ni","nigete kudasai"] },
    { r:"Tsunami ga kitara, takai tokoro ni ikimasu.", jp:"津波が来たら、高い所に行きます。", fr:"Si un tsunami arrive, on gagne les hauteurs.", t:["Tsunami","ga","kitara","takai tokoro","ni","ikimasu"] },
    { r:"Tatemono ga totemo yuremashita.", jp:"建物がとても揺れました。", fr:"Le bâtiment a beaucoup tremblé.", t:["Tatemono","ga","totemo","yuremashita"] },
    { r:"Minna de tasukeaimasu.", jp:"みんなで助け合います。", fr:"On s'entraide tous ensemble.", t:["Minna de","tasukeaimasu"] },
  ],
  conj: [
    { q:"kimasu → forme en ~tara", hint:"« si ça vient »", a:["kitara"] },
    { q:"mimasu → forme en ~tara", hint:"« si je vois »", a:["mitara"] },
    { q:"takai → forme en ~tara", hint:"adjectif en -i", a:["takakattara"] },
    { q:"nigemasu → demande polie", hint:"« fuyez »", a:["nigete kudasai"] },
  ],
  quiz: [
    { q:"Que commémore le 1er septembre ?", o:["Le séisme du Kantō de 1923","Le séisme de Kōbe","La fin de la guerre"], a:0 },
    { q:"Que s'est-il passé le 11 mars 2011 ?", o:["Séisme de magnitude 9,0 et tsunami au Tōhoku","Un typhon sur Ōsaka","L'éruption du mont Fuji"], a:0 },
    { q:"Quel est le premier réflexe enseigné ?", o:["Se protéger la tête et s'éloigner des fenêtres","Sortir en courant dans la rue","Prendre l'ascenseur"], a:0 },
  ],
},
{
  id: "l19", theme: "societe", title: "Se loger", jp: "住まい", r: "sumai",
  culture: [
    "On mesure une pièce en <b>tatamis</b> : un <i>jō</i> vaut environ 1,65 m², et une chambre d'étudiant fait souvent six tatamis. Les annonces parlent de <b>2LDK</b> — deux chambres plus un séjour-cuisine — et l'on visite en calculant le nombre de nattes, pas les mètres carrés.",
    "L'entrée, le <b>genkan</b>, est en contrebas : on s'y déchausse, chaussures tournées vers la sortie. Le sol de la pièce japonaise est fait de tatamis de paille de riz, changés tous les quelques années ; on y déroule le futon la nuit et on le range le matin.",
    "Louer coûte cher à l'installation : caution, commission d'agence, et souvent le <b>reikin</b>, « argent de remerciement » versé au propriétaire et jamais rendu. Près de la moitié des logements du pays se concentrent dans les grandes agglomérations, où l'on construit haut et étroit."
  ],
  vocab: [
    ["ie","家","いえ","maison"],
    ["heya","部屋","へや","pièce, chambre"],
    ["apāto","アパート","アパート","appartement"],
    ["sumimasu","住みます","すみます","habiter"],
    ["genkan","玄関","げんかん","entrée de la maison"],
    ["tatami","畳","たたみ","tatami"],
    ["futon","布団","ふとん","futon"],
    ["hikkoshi","引っ越し","ひっこし","déménagement"],
    ["semai","狭い","せまい","étroit, exigu"],
    ["hiroi","広い","ひろい","spacieux"],
    ["tsumori","つもり","つもり","intention"],
  ],
  kanji: ["家","部","屋","住"],
  grammar: {
    title: "Dire ses intentions : ~tsumori, ~yotei",
    explain: [
      "<b>~tsumori desu</b> exprime une intention personnelle. Il suit la forme du dictionnaire : <i>Tōkyō ni sumu tsumori desu</i> — j'ai l'intention d'habiter à Tōkyō. Au négatif : <i>sumanai tsumori desu</i>.",
      "<b>~yotei desu</b> annonce ce qui est prévu, planifié, souvent par d'autres ou par un calendrier : <i>Raigetsu hikkoshi suru yotei desu</i> — je dois déménager le mois prochain.",
      "Nuance : <i>tsumori</i> dit ce que je veux faire, <i>yotei</i> ce qui est au programme. Avec un nom, on emploie <b>no yotei</b> : <i>hikkoshi no yotei desu</i>."
    ],
    table: { head: ["Forme", "Exemple", "Sens"], rows: [
      ["dict. + tsumori desu", "kau tsumori desu", "j'ai l'intention d'acheter"],
      ["-nai + tsumori desu", "kawanai tsumori desu", "je compte ne pas acheter"],
      ["dict. + yotei desu", "iku yotei desu", "il est prévu que j'aille"],
      ["nom + no yotei desu", "ryokō no yotei desu", "un voyage est prévu"],
    ]},
  },
  sentences: [
    { r:"Kyōto ni sumu tsumori desu.", jp:"京都に住むつもりです。", fr:"J'ai l'intention d'habiter à Kyōto.", t:["Kyōto","ni","sumu","tsumori desu"] },
    { r:"Kono heya wa rokujō desu.", jp:"この部屋は六畳です。", fr:"Cette pièce fait six tatamis.", t:["Kono","heya","wa","rokujō","desu"] },
    { r:"Raigetsu hikkoshi suru yotei desu.", jp:"来月引っ越しする予定です。", fr:"Il est prévu que je déménage le mois prochain.", t:["Raigetsu","hikkoshi suru","yotei desu"] },
    { r:"Genkan de kutsu o nugimasu.", jp:"玄関で靴を脱ぎます。", fr:"On se déchausse dans l'entrée.", t:["Genkan","de","kutsu","o","nugimasu"] },
    { r:"Watashi no apāto wa semai desu ga, shizuka desu.", jp:"私のアパートは狭いですが、静かです。", fr:"Mon appartement est petit, mais calme.", t:["Watashi","no","apāto","wa","semai desu","ga","shizuka desu"] },
  ],
  conj: [
    { q:"sumimasu → forme du dictionnaire", hint:"avant tsumori", a:["sumu"] },
    { q:"kaimasu → « j'ai l'intention d'acheter »", hint:"dict. + tsumori desu", a:["kau tsumori desu"] },
    { q:"ikimasu → « il est prévu que j'aille »", hint:"dict. + yotei desu", a:["iku yotei desu"] },
    { q:"semai → négatif", hint:"adjectif en -i", a:["semakunai desu","semakunai"] },
  ],
  quiz: [
    { q:"En quoi mesure-t-on une pièce ?", o:["En tatamis","En pieds","En tatamis et en litres"], a:0 },
    { q:"Qu'est-ce que le genkan ?", o:["L'entrée en contrebas où l'on se déchausse","Le salon","Le balcon"], a:0 },
    { q:"Qu'est-ce que le reikin ?", o:["De l'argent versé au propriétaire, non rendu","La caution rendue au départ","La taxe d'habitation"], a:0 },
  ],
},
{
  id: "l20", theme: "arts", title: "La musique", jp: "音楽", r: "ongaku",
  culture: [
    "Le <b>gagaku</b>, musique de la cour impériale, se joue encore aujourd'hui avec les mêmes instruments qu'il y a plus de mille ans : c'est l'un des plus anciens répertoires d'orchestre conservés au monde. À côté, le <b>shamisen</b> à trois cordes, le <b>koto</b> à treize et les tambours <b>taiko</b> portent la musique populaire et le théâtre.",
    "L'<b>enka</b>, chanson sentimentale née au XXe siècle, chante la mer, l'alcool et les amours perdues. La <b>J-pop</b> et les génériques d'anime ont pris le relais auprès des jeunes générations et s'exportent largement.",
    "Le <b>karaoke</b> — « orchestre vide » — est inventé au début des années 1970 ; on l'attribue le plus souvent à Daisuke Inoue, qui n'a jamais déposé de brevet. On y chante dans une salle privée, entre amis ou collègues, et mal chanter fait partie du jeu."
  ],
  vocab: [
    ["ongaku","音楽","おんがく","musique"],
    ["uta","歌","うた","chanson"],
    ["utaimasu","歌います","うたいます","chanter"],
    ["koe","声","こえ","voix"],
    ["kikimasu","聞きます","ききます","écouter, entendre"],
    ["shamisen","三味線","しゃみせん","shamisen"],
    ["taiko","太鼓","たいこ","tambour"],
    ["jōzu","上手","じょうず","doué, habile"],
    ["heta","下手","へた","maladroit, mauvais"],
    ["nagara","ながら","ながら","tout en (faisant)"],
    ["karaoke","カラオケ","カラオケ","karaoké"],
  ],
  kanji: ["音","楽","歌","声"],
  grammar: {
    title: "Deux actions à la fois : ~nagara · être doué : ga jōzu desu",
    explain: [
      "<b>~nagara</b> relie deux actions simultanées faites par la même personne. On le colle au radical du verbe, celui qui reste quand on retire -masu : <i>ongaku o kikinagara benkyō shimasu</i> — j'étudie en écoutant de la musique. L'action principale est la seconde.",
      "<b>ga jōzu desu</b> dit qu'on est doué à quelque chose, <b>ga heta desu</b> l'inverse : <i>uta ga jōzu desu</i> — il chante bien. Ce sont des adjectifs en -na.",
      "Pour parler de soi, on préfère la modestie : on dira <i>amari jōzu ja arimasen</i> — je ne suis pas très bon — plutôt que de se déclarer doué."
    ],
    table: { head: ["Verbe", "Radical", "Avec ~nagara"], rows: [
      ["kikimasu", "kiki", "kikinagara"],
      ["tabemasu", "tabe", "tabenagara"],
      ["arukimasu", "aruki", "arukinagara"],
      ["hanashimasu", "hanashi", "hanashinagara"],
    ]},
  },
  sentences: [
    { r:"Ongaku o kikinagara benkyō shimasu.", jp:"音楽を聞きながら勉強します。", fr:"J'étudie en écoutant de la musique.", t:["Ongaku","o","kikinagara","benkyō shimasu"] },
    { r:"Kanojo wa uta ga totemo jōzu desu.", jp:"彼女は歌がとても上手です。", fr:"Elle chante très bien.", t:["Kanojo","wa","uta","ga","totemo","jōzu desu"] },
    { r:"Watashi wa amari jōzu ja arimasen.", jp:"私はあまり上手じゃありません。", fr:"Je ne suis pas très bon.", t:["Watashi","wa","amari","jōzu ja arimasen"] },
    { r:"Tomodachi to karaoke ni ikimashita.", jp:"友達とカラオケに行きました。", fr:"Je suis allé au karaoké avec des amis.", t:["Tomodachi","to","karaoke","ni","ikimashita"] },
    { r:"Taiko no oto ga suki desu.", jp:"太鼓の音が好きです。", fr:"J'aime le son des tambours.", t:["Taiko","no","oto","ga","suki desu"] },
  ],
  conj: [
    { q:"kikimasu → forme en ~nagara", hint:"radical + nagara", a:["kikinagara"] },
    { q:"tabemasu → forme en ~nagara", hint:"radical + nagara", a:["tabenagara"] },
    { q:"Uta ___ jōzu desu.", hint:"particule devant jōzu", a:["ga"] },
    { q:"jōzu → négatif poli", hint:"adjectif en -na", a:["jōzu ja arimasen","jōzu dewa arimasen"] },
  ],
  quiz: [
    { q:"Qu'est-ce que le gagaku ?", o:["La musique de la cour impériale, jouée depuis plus de mille ans","La chanson populaire d'après-guerre","Un genre de J-pop"], a:0 },
    { q:"Que veut dire « karaoke » ?", o:["Orchestre vide","Salle de chant","Micro libre"], a:0 },
    { q:"Combien de cordes a le shamisen ?", o:["Trois","Treize","Six"], a:0 },
  ],
},
{
  id: "l21", theme: "politique", title: "Préfectures et pays natal", jp: "都道府県とふるさと", r: "todōfuken to furusato",
  culture: [
    "Le Japon est découpé en <b>47 préfectures</b> : quarante-trois <i>ken</i>, deux <i>fu</i> (Ōsaka et Kyōto), un <i>to</i> (Tōkyō) et un <i>dō</i> (Hokkaidō). Chacune élit son gouverneur et son assemblée, et gère écoles, routes et hôpitaux.",
    "Les campagnes se vident : des villages entiers où plus de la moitié des habitants a passé 65 ans sont appelés <i>genkai shūraku</i>, « communautés à la limite ». Écoles fermées, maisons vides — les <i>akiya</i> — parfois cédées pour presque rien à qui veut s'installer.",
    "Pour rééquilibrer, l'État a créé le <b>furusato nōzei</b> : on verse une partie de ses impôts à la commune de son choix, souvent celle de son enfance, qui remercie par un colis de produits locaux. Chaque préfecture cultive d'ailleurs sa spécialité et sa mascotte."
  ],
  vocab: [
    ["ken","県","けん","préfecture"],
    ["shi","市","し","ville"],
    ["machi","町","まち","ville, quartier"],
    ["mura","村","むら","village"],
    ["furusato","故郷","ふるさと","pays natal"],
    ["inaka","田舎","いなか","campagne"],
    ["chihō","地方","ちほう","région, province"],
    ["narimasu","なります","なります","devenir"],
    ["sukunai","少ない","すくない","peu nombreux"],
    ["ōi","多い","おおい","nombreux"],
    ["meibutsu","名物","めいぶつ","spécialité locale"],
  ],
  kanji: ["県","市","村","町"],
  grammar: {
    title: "Devenir : ~ni narimasu, ~ku narimasu",
    explain: [
      "Avec un nom ou un adjectif en -na, on emploie <b>ni narimasu</b> : <i>sensei ni narimasu</i> — je deviens professeur ; <i>shizuka ni narimashita</i> — c'est devenu calme.",
      "Avec un adjectif en -i, le -i final devient <b>-ku</b> : <i>takai → takaku narimasu</i>, ça devient cher. <i>Ii</i> fait <i>yoku narimasu</i>.",
      "Le même mécanisme sert à dire qu'on fait devenir quelque chose, avec <b>shimasu</b> : <i>heya o kirei ni shimasu</i> — je rends la pièce propre."
    ],
    table: { head: ["Départ", "Devenir", "Sens"], rows: [
      ["sensei", "sensei ni narimasu", "devenir professeur"],
      ["shizuka", "shizuka ni narimasu", "devenir calme"],
      ["takai", "takaku narimasu", "devenir cher"],
      ["ii", "yoku narimasu", "s'améliorer"],
    ]},
  },
  sentences: [
    { r:"Inaka no hito ga sukunaku narimashita.", jp:"田舎の人が少なくなりました。", fr:"Les habitants des campagnes se sont raréfiés.", t:["Inaka","no","hito","ga","sukunaku narimashita"] },
    { r:"Kono machi wa shizuka ni narimashita.", jp:"この町は静かになりました。", fr:"Cette ville est devenue calme.", t:["Kono","machi","wa","shizuka ni narimashita"] },
    { r:"Nihon ni wa yonjūnana no ken ga arimasu.", jp:"日本には四十七の県があります。", fr:"Le Japon compte quarante-sept préfectures.", t:["Nihon ni wa","yonjūnana","no","ken","ga","arimasu"], say:"にほんにはよんじゅうななのけんがあります。" },
    { r:"Watashi no furusato wa chiisai mura desu.", jp:"私の故郷は小さい村です。", fr:"Mon pays natal est un petit village.", t:["Watashi","no","furusato","wa","chiisai","mura","desu"] },
    { r:"Kono ken no meibutsu wa ocha desu.", jp:"この県の名物はお茶です。", fr:"La spécialité de cette préfecture, c'est le thé.", t:["Kono","ken","no","meibutsu","wa","ocha","desu"] },
  ],
  conj: [
    { q:"takai → « devenir cher »", hint:"adjectif en -i", a:["takaku narimasu"] },
    { q:"shizuka → « devenir calme »", hint:"adjectif en -na", a:["shizuka ni narimasu"] },
    { q:"ii → « s'améliorer »", hint:"exception", a:["yoku narimasu"] },
    { q:"sensei ___ narimasu.", hint:"particule après un nom", a:["ni"] },
  ],
  quiz: [
    { q:"Combien de préfectures compte le Japon ?", o:["47","32","64"], a:0 },
    { q:"Que désigne un akiya ?", o:["Une maison vide, souvent à la campagne","Une mairie de village","Un marché local"], a:0 },
    { q:"À quoi sert le furusato nōzei ?", o:["Verser une part de ses impôts à la commune de son choix","Payer moins d'impôts en ville","Financer les préfectures par l'État"], a:0 },
  ],
},
{
  id: "l22", theme: "histoire", title: "Hiroshima et la mémoire", jp: "広島と記憶", r: "Hiroshima to kioku",
  culture: [
    "Le <b>6 août 1945 à 8 h 15</b>, une bombe atomique est larguée sur <b>Hiroshima</b> ; trois jours plus tard, une seconde frappe Nagasaki. Les estimations font état d'environ 140 000 morts à Hiroshima à la fin de l'année 1945, en comptant les suites des radiations.",
    "Le seul bâtiment laissé en ruine au centre, le <b>Dôme de Genbaku</b>, est inscrit au patrimoine mondial en 1996. Le parc du Mémorial de la paix l'entoure ; une flamme y brûle, qui doit s'éteindre le jour où la dernière arme nucléaire aura disparu.",
    "L'histoire de <b>Sadako Sasaki</b>, morte d'une leucémie à douze ans après avoir plié des grues en papier, a fait de l'<b>origami</b> de grue un symbole mondial de la paix : on en dépose par milliers au monument des enfants. Chaque 6 août, la ville sonne la cloche à 8 h 15."
  ],
  vocab: [
    ["heiwa","平和","へいわ","paix"],
    ["sensō","戦争","せんそう","guerre"],
    ["kioku","記憶","きおく","mémoire, souvenir"],
    ["inori","祈り","いのり","prière"],
    ["tsuru","鶴","つる","grue (oiseau)"],
    ["origami","折り紙","おりがみ","pliage de papier"],
    ["nokorimasu","残ります","のこります","rester, subsister"],
    ["tsutaemasu","伝えます","つたえます","transmettre"],
    ["kanashimi","悲しみ","かなしみ","tristesse"],
    ["wasuremasu","忘れます","わすれます","oublier"],
  ],
  kanji: ["平","和","戦","争"],
  grammar: {
    title: "Le passif : ~raremasu",
    explain: [
      "Au passif, le groupe 1 transforme la syllabe avant -masu en -a puis ajoute <b>-remasu</b> : <i>tsukurimasu → tsukuraremasu</i> (être fabriqué), <i>kakimasu → kakaremasu</i> (être écrit).",
      "Le groupe 2 ajoute <b>-raremasu</b> au radical : <i>tabemasu → taberaremasu</i>. Les irréguliers donnent <i>shimasu → saremasu</i> et <i>kimasu → koraremasu</i>.",
      "L'agent, quand il est nommé, est marqué par <b>ni</b> : <i>Kono hon wa gakusei ni yomaremasu</i> — ce livre est lu par les étudiants. Le passif sert souvent à parler d'un fait sans en désigner l'auteur."
    ],
    table: { head: ["Actif", "Passif", "Sens"], rows: [
      ["tsukurimasu", "tsukuraremasu", "être fabriqué"],
      ["kakimasu", "kakaremasu", "être écrit"],
      ["tabemasu", "taberaremasu", "être mangé"],
      ["shimasu", "saremasu", "être fait"],
    ]},
  },
  sentences: [
    { r:"Kono kōen wa heiwa no tame ni tsukuraremashita.", jp:"この公園は平和のために作られました。", fr:"Ce parc a été créé pour la paix.", t:["Kono","kōen","wa","heiwa no tame ni","tsukuraremashita"] },
    { r:"Machi wa sensō de kowasaremashita.", jp:"町は戦争で壊されました。", fr:"La ville a été détruite par la guerre.", t:["Machi","wa","sensō","de","kowasaremashita"] },
    { r:"Sadako no hanashi wa ima mo tsutaerarete imasu.", jp:"禎子の話は今も伝えられています。", fr:"L'histoire de Sadako se transmet encore aujourd'hui.", t:["Sadako","no","hanashi","wa","ima mo","tsutaerarete imasu"], say:"さだこのはなしはいまもつたえられています。" },
    { r:"Watashitachi wa sensō o wasuremasen.", jp:"私たちは戦争を忘れません。", fr:"Nous n'oublions pas la guerre.", t:["Watashitachi","wa","sensō","o","wasuremasen"] },
    { r:"Tsuru wa heiwa no shirushi desu.", jp:"鶴は平和のしるしです。", fr:"La grue est un symbole de paix.", t:["Tsuru","wa","heiwa","no","shirushi","desu"] },
  ],
  conj: [
    { q:"tsukurimasu → passif", hint:"groupe 1", a:["tsukuraremasu"] },
    { q:"kakimasu → passif", hint:"groupe 1", a:["kakaremasu"] },
    { q:"tabemasu → passif", hint:"groupe 2", a:["taberaremasu"] },
    { q:"shimasu → passif", hint:"irrégulier", a:["saremasu"] },
  ],
  quiz: [
    { q:"Quand la bombe est-elle larguée sur Hiroshima ?", o:["Le 6 août 1945 à 8 h 15","Le 9 août 1945","Le 15 août 1945"], a:0 },
    { q:"Qu'est-ce que le Dôme de Genbaku ?", o:["Le bâtiment laissé en ruine, au patrimoine mondial depuis 1996","Un musée construit en 1996","Le mémorial des enfants"], a:0 },
    { q:"Pourquoi plie-t-on des grues en papier ?", o:["En mémoire de Sadako Sasaki, comme vœu de paix","Pour la fête des enfants","Pour décorer les sanctuaires"], a:0 },
  ],
},
{
  id: "l23", theme: "arts", title: "Le jardin", jp: "日本庭園", r: "nihon teien",
  culture: [
    "Le jardin japonais ne se promène pas toujours : il se regarde. Le <b>karesansui</b>, jardin sec, remplace l'eau par du gravier ratissé et les montagnes par des pierres dressées. Celui du <b>Ryōan-ji</b>, à Kyōto, aligne quinze pierres disposées de telle façon qu'on n'en voit jamais plus de quatorze à la fois.",
    "Le <b>shakkei</b> — le « paysage emprunté » — intègre au jardin une montagne ou une forêt lointaines, en cadrant la vue par des haies et des toits. Rien n'est laissé au hasard : chaque pin est taillé pendant des décennies pour ressembler à un vieil arbre battu par le vent.",
    "Trois jardins sont dits les plus beaux du pays : Kenroku-en à Kanazawa, Kōraku-en à Okayama et Kairaku-en à Mito. La mousse, les érables, la pierre mouillée : l'esthétique cherche l'impermanence plutôt que l'éclat."
  ],
  vocab: [
    ["niwa","庭","にわ","jardin"],
    ["teien","庭園","ていえん","jardin (aménagé)"],
    ["ishi","石","いし","pierre"],
    ["ike","池","いけ","bassin, étang"],
    ["koke","苔","こけ","mousse"],
    ["matsu","松","まつ","pin"],
    ["shizuka","静か","しずか","calme"],
    ["utsukushii","美しい","うつくしい","beau"],
    ["hoshii","欲しい","ほしい","vouloir (une chose)"],
    ["sugimasu","すぎます","すぎます","trop, à l'excès"],
    ["nagameru","眺めます","ながめます","contempler"],
  ],
  kanji: ["庭","石","池","静"],
  grammar: {
    title: "Trop : ~sugimasu · vouloir une chose : ~ga hoshii desu",
    explain: [
      "<b>~sugimasu</b> marque l'excès. Sur un verbe, il se colle au radical : <i>tabesugimashita</i> — j'ai trop mangé. Sur un adjectif en -i, on retire le -i : <i>takasugimasu</i> — c'est trop cher. Sur un adjectif en -na, on l'ajoute tel quel : <i>shizuka sugimasu</i>.",
      "<b>~ga hoshii desu</b> dit qu'on veut une chose (pas une action, qui demande <i>-tai</i>) : <i>Ishi no niwa ga hoshii desu</i> — je voudrais un jardin de pierres.",
      "Comme <i>-tai</i>, <i>hoshii</i> ne s'emploie pas pour dire ce qu'une autre personne veut : on ajoute alors <i>~hoshigatte imasu</i> ou l'on passe par « il semble que »."
    ],
    table: { head: ["Base", "Avec ~sugimasu", "Sens"], rows: [
      ["tabemasu", "tabesugimasu", "manger de trop"],
      ["nomimasu", "nomisugimasu", "boire de trop"],
      ["takai", "takasugimasu", "être trop cher"],
      ["shizuka", "shizuka sugimasu", "être trop calme"],
    ]},
  },
  sentences: [
    { r:"Kono niwa wa totemo utsukushii desu.", jp:"この庭はとても美しいです。", fr:"Ce jardin est très beau.", t:["Kono","niwa","wa","totemo","utsukushii","desu"] },
    { r:"Ishi to koke dake no niwa desu.", jp:"石と苔だけの庭です。", fr:"C'est un jardin fait seulement de pierres et de mousse.", t:["Ishi","to","koke","dake no","niwa","desu"] },
    { r:"Kinō wa ocha o nomisugimashita.", jp:"昨日はお茶を飲みすぎました。", fr:"Hier, j'ai bu trop de thé.", t:["Kinō","wa","ocha","o","nomisugimashita"] },
    { r:"Chiisai ike ga hoshii desu.", jp:"小さい池が欲しいです。", fr:"Je voudrais un petit bassin.", t:["Chiisai","ike","ga","hoshii desu"] },
    { r:"Ryōan-ji no ishi wa jūgo arimasu.", jp:"龍安寺の石は十五あります。", fr:"Le Ryōan-ji compte quinze pierres.", t:["Ryōan-ji","no","ishi","wa","jūgo","arimasu"], say:"りょうあんじのいしはじゅうごあります。" },
  ],
  conj: [
    { q:"tabemasu → « manger de trop »", hint:"radical + sugimasu", a:["tabesugimasu"] },
    { q:"takai → « trop cher »", hint:"on retire le -i", a:["takasugimasu"] },
    { q:"Niwa ___ hoshii desu.", hint:"particule devant hoshii", a:["ga"] },
    { q:"nomimasu → « j'ai trop bu »", hint:"passé de nomisugimasu", a:["nomisugimashita"] },
  ],
  quiz: [
    { q:"Qu'est-ce qu'un karesansui ?", o:["Un jardin sec, de gravier et de pierres","Un jardin de thé","Un jardin de promenade avec étang"], a:0 },
    { q:"Combien de pierres voit-on à la fois au Ryōan-ji ?", o:["Quatorze au maximum, sur quinze","Les quinze","Sept"], a:0 },
    { q:"Que désigne le shakkei ?", o:["Le paysage lointain emprunté par le jardin","La taille des pins","Le ratissage du gravier"], a:0 },
  ],
},
{
  id: "l24", theme: "societe", title: "Les rites de l'année", jp: "年中行事", r: "nenjū gyōji",
  culture: [
    "L'année s'ouvre par le <b>hatsumōde</b>, la première visite au sanctuaire, où l'on prie pour l'année qui vient. Fin avril et début mai, la <b>Golden Week</b> aligne quatre jours fériés : c'est la grande semaine de voyage, trains pleins et autoroutes saturées.",
    "À la mi-août vient l'<b>Obon</b> : on rentre au pays, on nettoie les tombes familiales et l'on danse le <i>bon odori</i> sur la place du quartier. La tradition veut que les âmes des ancêtres reviennent quelques jours parmi les vivants, guidées par des lanternes.",
    "Les rites de la vie se partagent entre les religions : mariage au sanctuaire ou à la chapelle, funérailles au temple bouddhique. On y apporte une enveloppe — <i>koden</i> pour un deuil, <i>goshūgi</i> pour un mariage — au montant codifié, en billets neufs pour la joie, usagés pour le deuil."
  ],
  vocab: [
    ["shōgatsu","正月","しょうがつ","Nouvel An"],
    ["hatsumōde","初詣","はつもうで","première visite au sanctuaire"],
    ["obon","お盆","おぼん","fête des morts"],
    ["kekkon","結婚","けっこん","mariage"],
    ["oiwai","お祝い","おいわい","félicitations, cadeau de fête"],
    ["ryokō","旅行","りょこう","voyage"],
    ["kazoku","家族","かぞく","famille"],
    ["shinseki","親戚","しんせき","parenté"],
    ["irasshaimase","いらっしゃいませ","いらっしゃいませ","bienvenue (dans un commerce)"],
    ["onegaishimasu","お願いします","おねがいします","s'il vous plaît, je vous prie"],
    ["osewa ni narimashita","お世話になりました","おせわになりました","merci de votre aide"],
  ],
  kanji: ["式","祝","旅","族"],
  grammar: {
    title: "Les formules de politesse",
    explain: [
      "Le japonais poli repose moins sur des règles que sur des <b>formules toutes faites</b>, à placer au bon moment. <i>Irasshaimase</i> vous accueille en boutique ; on n'y répond pas. <i>Onegaishimasu</i> accompagne toute demande ; <i>sumimasen</i> sert à la fois d'excuse, de remerciement et d'appel.",
      "Le <b>keigo</b> dispose de verbes entiers : <i>irasshaimasu</i> remplace <i>imasu</i> ou <i>ikimasu</i> pour parler de l'autre avec respect ; <i>itadakimasu</i> et <i>mairimasu</i> s'emploient pour soi, en s'abaissant.",
      "À retenir pour les occasions : <b>omedetō gozaimasu</b> (félicitations), <b>otsukaresama desu</b> (bon courage, merci pour le travail), <b>osewa ni narimashita</b> (merci de tout ce que vous avez fait)."
    ],
    table: { head: ["Neutre", "Respect (l'autre)", "Modestie (soi)"], rows: [
      ["imasu / ikimasu", "irasshaimasu", "orimasu / mairimasu"],
      ["shimasu", "nasaimasu", "itashimasu"],
      ["tabemasu", "meshiagarimasu", "itadakimasu"],
      ["iimasu", "osshaimasu", "mōshimasu"],
    ]},
  },
  sentences: [
    { r:"Shōgatsu ni kazoku to hatsumōde ni ikimasu.", jp:"正月に家族と初詣に行きます。", fr:"Au Nouvel An, je vais au sanctuaire avec ma famille.", t:["Shōgatsu","ni","kazoku","to","hatsumōde","ni","ikimasu"] },
    { r:"Obon ni furusato ni kaerimasu.", jp:"お盆に故郷に帰ります。", fr:"Pour l'Obon, je rentre au pays.", t:["Obon","ni","furusato","ni","kaerimasu"] },
    { r:"Go-kekkon omedetō gozaimasu.", jp:"ご結婚おめでとうございます。", fr:"Toutes mes félicitations pour votre mariage.", t:["Go-kekkon","omedetō gozaimasu"] },
    { r:"Taihen osewa ni narimashita.", jp:"大変お世話になりました。", fr:"Merci infiniment pour votre aide.", t:["Taihen","osewa ni narimashita"] },
    { r:"Kochira ni irasshatte kudasai.", jp:"こちらにいらっしゃってください。", fr:"Venez par ici, je vous prie.", t:["Kochira","ni","irasshatte kudasai"] },
  ],
  conj: [
    { q:"ikimasu → forme respectueuse", hint:"on parle de l'autre", a:["irasshaimasu"] },
    { q:"tabemasu → forme modeste", hint:"on parle de soi", a:["itadakimasu"] },
    { q:"shimasu → forme modeste", hint:"on parle de soi", a:["itashimasu"] },
    { q:"« Félicitations »", hint:"formule complète", a:["omedetō gozaimasu","omedetou gozaimasu"] },
  ],
  quiz: [
    { q:"Qu'est-ce que le hatsumōde ?", o:["La première visite au sanctuaire de l'année","Le grand ménage de fin d'année","La fête des enfants"], a:0 },
    { q:"Que célèbre l'Obon ?", o:["Le retour des âmes des ancêtres","La moisson du riz","L'anniversaire de l'empereur"], a:0 },
    { q:"Quels billets met-on dans une enveloppe de deuil ?", o:["Des billets usagés","Des billets neufs","Peu importe"], a:0 },
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
  ["仕","servir, faire","SHI","tsuka(eru)",[["shigoto","仕事","しごと","travail"]]],
  ["事","chose, affaire","JI","koto",[["shigoto","仕事","しごと","travail"],["daiji","大事","だいじ","important"]]],
  ["社","société, sanctuaire","SHA","yashiro",[["kaisha","会社","かいしゃ","entreprise"],["jinja","神社","じんじゃ","sanctuaire"]]],
  ["員","membre","IN","—",[["kaishain","会社員","かいしゃいん","employé d'entreprise"],["ten'in","店員","てんいん","vendeur"]]],
  ["米","riz, Amérique","BEI, MAI","kome",[["kome","米","こめ","riz (cru)"],["Beikoku","米国","べいこく","États-Unis"]]],
  ["魚","poisson","GYO","sakana, uo",[["sakana","魚","さかな","poisson"],["kingyo","金魚","きんぎょ","poisson rouge"]]],
  ["肉","viande","NIKU","—",[["niku","肉","にく","viande"],["gyūniku","牛肉","ぎゅうにく","bœuf"]]],
  ["飲","boire","IN","no(mu)",[["nomimasu","飲みます","のみます","boire"],["nomimono","飲み物","のみもの","boisson"]]],
  ["映","refléter, projeter","EI","utsu(ru)",[["eiga","映画","えいが","film"]]],
  ["画","image, trait","GA, KAKU","—",[["eiga","映画","えいが","film"],["manga","漫画","まんが","bande dessinée"]]],
  ["神","divinité","SHIN, JIN","kami",[["kami","神","かみ","kami, divinité"],["jinja","神社","じんじゃ","sanctuaire"]]],
  ["祈","prier","KI","ino(ru)",[["inorimasu","祈ります","いのります","prier"]]],
  ["寺","temple","JI","tera",[["otera","お寺","おてら","temple"],["Kinkaku-ji","金閣寺","きんかくじ","Pavillon d'or"]]],
  ["校","école","KŌ","—",[["gakkō","学校","がっこう","école"],["kōkō","高校","こうこう","lycée"]]],
  ["教","enseigner","KYŌ","oshi(eru)",[["kyōshitsu","教室","きょうしつ","salle de classe"],["oshiemasu","教えます","おしえます","enseigner"]]],
  ["室","pièce, salle","SHITSU","muro",[["kyōshitsu","教室","きょうしつ","salle de classe"],["washitsu","和室","わしつ","pièce à tatami"]]],
  ["読","lire","DOKU","yo(mu)",[["yomimasu","読みます","よみます","lire"],["dokusho","読書","どくしょ","lecture"]]],
  ["買","acheter","BAI","ka(u)",[["kaimasu","買います","かいます","acheter"],["kaimono","買い物","かいもの","courses"]]],
  ["売","vendre","BAI","u(ru)",[["urimasu","売ります","うります","vendre"],["baiten","売店","ばいてん","kiosque"]]],
  ["安","bon marché, paisible","AN","yasu(i)",[["yasui","安い","やすい","bon marché"],["anzen","安全","あんぜん","sécurité"]]],
  ["体","corps","TAI","karada",[["karada","体","からだ","corps"],["taiiku","体育","たいいく","éducation physique"]]],
  ["湯","eau chaude","TŌ","yu",[["oyu","お湯","おゆ","eau chaude"],["yunomi","湯のみ","ゆのみ","tasse à thé"]]],
  ["駅","gare","EKI","—",[["eki","駅","えき","gare"],["ekiben","駅弁","えきべん","bento de gare"]]],
  ["電","électricité","DEN","—",[["densha","電車","でんしゃ","train"],["denwa","電話","でんわ","téléphone"]]],
  ["車","véhicule","SHA","kuruma",[["kuruma","車","くるま","voiture"],["densha","電車","でんしゃ","train"]]],
  ["道","chemin, voie","DŌ","michi",[["michi","道","みち","chemin"],["sadō","茶道","さどう","voie du thé"]]],
  ["高","haut, cher","KŌ","taka(i)",[["takai","高い","たかい","cher, haut"],["kōkō","高校","こうこう","lycée"]]],
  ["気","air, esprit, humeur","KI, KE","—",[["tenki","天気","てんき","météo"],["kimochii","気持ちいい","きもちいい","agréable"]]],
  ["送","envoyer","SŌ","oku(ru)",[["okurimasu","送ります","おくります","envoyer"],["okurimono","贈り物","おくりもの","cadeau"]]],
  ["品","article, qualité","HIN","shina",[["shinamono","品物","しなもの","marchandise"],["sakuhin","作品","さくひん","œuvre"]]],
  ["礼","politesse, remerciement","REI, RAI","—",[["orei","お礼","おれい","remerciement"],["shitsurei","失礼","しつれい","impolitesse, « pardon »"]]],
  ["正","juste, correct","SEI, SHŌ","tada(shii)",[["shōgatsu","正月","しょうがつ","Nouvel An"],["tadashii","正しい","ただしい","juste, exact"]]],
  ["地","terre, lieu","CHI, JI","—",[["jishin","地震","じしん","séisme"],["chihō","地方","ちほう","région"]]],
  ["震","trembler","SHIN","furu(eru)",[["jishin","地震","じしん","séisme"],["shindo","震度","しんど","intensité sismique"]]],
  ["助","aider","JO","tasu(keru)",[["tasukemasu","助けます","たすけます","aider"],["joshu","助手","じょしゅ","assistant"]]],
  ["防","prévenir, protéger","BŌ","fuse(gu)",[["bōsai","防災","ぼうさい","prévention des catastrophes"],["shōbō","消防","しょうぼう","pompiers"]]],
  ["家","maison, famille","KA, KE","ie, ya",[["ie","家","いえ","maison"],["kazoku","家族","かぞく","famille"]]],
  ["部","partie, section","BU","—",[["heya","部屋","へや","pièce"],["bukatsu","部活","ぶかつ","club scolaire"]]],
  ["屋","boutique, toit","OKU","ya",[["heya","部屋","へや","pièce"],["honya","本屋","ほんや","librairie"]]],
  ["住","habiter","JŪ","su(mu)",[["sumimasu","住みます","すみます","habiter"],["jūsho","住所","じゅうしょ","adresse"]]],
  ["音","son","ON","oto",[["ongaku","音楽","おんがく","musique"],["oto","音","おと","son, bruit"]]],
  ["楽","plaisir, musique","GAKU, RAKU","tano(shii)",[["ongaku","音楽","おんがく","musique"],["tanoshii","楽しい","たのしい","agréable, amusant"]]],
  ["歌","chanter, chanson","KA","uta(u)",[["uta","歌","うた","chanson"],["utaimasu","歌います","うたいます","chanter"]]],
  ["声","voix","SEI","koe",[["koe","声","こえ","voix"],["ōgoe","大声","おおごえ","voix forte"]]],
  ["県","préfecture","KEN","—",[["ken","県","けん","préfecture"],["kenchō","県庁","けんちょう","préfecture (administration)"]]],
  ["市","ville, marché","SHI","ichi",[["shi","市","し","ville"],["shiyakusho","市役所","しやくしょ","mairie"]]],
  ["村","village","SON","mura",[["mura","村","むら","village"],["sonchō","村長","そんちょう","maire du village"]]],
  ["町","ville, quartier","CHŌ","machi",[["machi","町","まち","ville, quartier"],["shitamachi","下町","したまち","quartiers populaires"]]],
  ["平","plat, paisible","HEI, BYŌ","tai(ra)",[["heiwa","平和","へいわ","paix"],["Heian","平安","へいあん","époque Heian"]]],
  ["和","harmonie, japonais","WA","yawa(ragu)",[["heiwa","平和","へいわ","paix"],["washoku","和食","わしょく","cuisine japonaise"]]],
  ["戦","combattre","SEN","tataka(u)",[["sensō","戦争","せんそう","guerre"],["taisen","大戦","たいせん","guerre mondiale"]]],
  ["争","se disputer","SŌ","araso(u)",[["sensō","戦争","せんそう","guerre"],["kyōsō","競争","きょうそう","concurrence"]]],
  ["庭","jardin","TEI","niwa",[["niwa","庭","にわ","jardin"],["teien","庭園","ていえん","jardin aménagé"]]],
  ["石","pierre","SEKI, KOKU","ishi",[["ishi","石","いし","pierre"],["seki-tei","石庭","せきてい","jardin de pierres"]]],
  ["池","étang, bassin","CHI","ike",[["ike","池","いけ","bassin"],["denchi","電池","でんち","pile"]]],
  ["静","calme","SEI","shizu(ka)",[["shizuka","静か","しずか","calme"],["seishi","静止","せいし","immobilité"]]],
  ["式","cérémonie, formule","SHIKI","—",[["kekkonshiki","結婚式","けっこんしき","cérémonie de mariage"],["nyūgakushiki","入学式","にゅうがくしき","cérémonie de rentrée"]]],
  ["祝","célébrer","SHUKU","iwa(u)",[["oiwai","お祝い","おいわい","félicitations, cadeau de fête"],["shukujitsu","祝日","しゅくじつ","jour férié"]]],
  ["旅","voyage","RYO","tabi",[["ryokō","旅行","りょこう","voyage"],["tabi","旅","たび","voyage, périple"]]],
  ["族","famille, clan","ZOKU","—",[["kazoku","家族","かぞく","famille"],["minzoku","民族","みんぞく","peuple, ethnie"]]],
];

// ─── Hiragana ──────────────────────────────────────────────────────
const HIRA_ROWS = [
  { id:"a",  label:"あ", cells:[["あ","a"],["い","i"],["う","u"],["え","e"],["お","o"]] },
  { id:"ka", label:"か", cells:[["か","ka"],["き","ki"],["く","ku"],["け","ke"],["こ","ko"]] },
  { id:"sa", label:"さ", cells:[["さ","sa"],["し","shi"],["す","su"],["せ","se"],["そ","so"]] },
  { id:"ta", label:"た", cells:[["た","ta"],["ち","chi"],["つ","tsu"],["て","te"],["と","to"]] },
  { id:"na", label:"な", cells:[["な","na"],["に","ni"],["ぬ","nu"],["ね","ne"],["の","no"]] },
  { id:"ha", label:"は", cells:[["は","ha"],["ひ","hi"],["ふ","fu"],["へ","he"],["ほ","ho"]] },
  { id:"ma", label:"ま", cells:[["ま","ma"],["み","mi"],["む","mu"],["め","me"],["も","mo"]] },
  { id:"ya", label:"や", cells:[["や","ya"],null,["ゆ","yu"],null,["よ","yo"]] },
  { id:"ra", label:"ら", cells:[["ら","ra"],["り","ri"],["る","ru"],["れ","re"],["ろ","ro"]] },
  { id:"wa", label:"わ", cells:[["わ","wa"],null,null,null,["を","o"]] },
  { id:"n",  label:"ん", cells:[["ん","n"],null,null,null,null] },
  { id:"ga", label:"が", dak:true, cells:[["が","ga"],["ぎ","gi"],["ぐ","gu"],["げ","ge"],["ご","go"]] },
  { id:"za", label:"ざ", dak:true, cells:[["ざ","za"],["じ","ji"],["ず","zu"],["ぜ","ze"],["ぞ","zo"]] },
  { id:"da", label:"だ", dak:true, cells:[["だ","da"],["ぢ","ji"],["づ","zu"],["で","de"],["ど","do"]] },
  { id:"ba", label:"ば", dak:true, cells:[["ば","ba"],["び","bi"],["ぶ","bu"],["べ","be"],["ぼ","bo"]] },
  { id:"pa", label:"ぱ", dak:true, cells:[["ぱ","pa"],["ぴ","pi"],["ぷ","pu"],["ぺ","pe"],["ぽ","po"]] },
];

// Mots en hiragana pour la lecture : [hiragana, romaji, français]
const HIRA_WORDS = [
  ["ねこ","neko","chat"],["いぬ","inu","chien"],["やま","yama","montagne"],["かわ","kawa","rivière"],
  ["うみ","umi","mer"],["そら","sora","ciel"],["はな","hana","fleur"],["みず","mizu","eau"],
  ["ひと","hito","personne"],["とり","tori","oiseau"],["さかな","sakana","poisson"],["くるま","kuruma","voiture"],
  ["でんしゃ","densha","train"],["がっこう","gakkō","école"],["せんせい","sensei","professeur"],["ともだち","tomodachi","ami"],
  ["あさ","asa","matin"],["よる","yoru","nuit"],["きょう","kyō","aujourd'hui"],["あした","ashita","demain"],
  ["ごはん","gohan","riz, repas"],["おちゃ","ocha","thé"],["たまご","tamago","œuf"],["さくら","sakura","cerisier"],
  ["ゆき","yuki","neige"],["あめ","ame","pluie"],["かぜ","kaze","vent"],["ほん","hon","livre"],
  ["えき","eki","gare"],["みせ","mise","magasin"],["しごと","shigoto","travail"],["おかね","okane","argent"],
  ["なまえ","namae","nom"],["ありがとう","arigatō","merci"],["おはよう","ohayō","bonjour (le matin)"],["こんばんは","konbanwa","bonsoir"],
  ["さようなら","sayōnara","au revoir"],["くだもの","kudamono","fruit"],["やさい","yasai","légume"],["いえ","ie","maison"],
];

// ─── Calligraphie ──────────────────────────────────────────────────
// Les huit principes de 永 (永字八法) : chaque trait du caractère « éternité »
// porte un nom et un geste. C'est la gamme de base de la main.
const EIGHT = [
  { n:1, jp:"側", r:"soku", fr:"le point", note:"On pose la pointe, on appuie, on relève : la goutte d'encre penche vers la droite." },
  { n:2, jp:"勒", r:"roku", fr:"la bride", note:"Trait horizontal : attaque franche, corps légèrement montant, pause finale." },
  { n:3, jp:"努", r:"do", fr:"l'effort", note:"Trait vertical : droit et tendu, il tient tout le caractère." },
  { n:4, jp:"趯", r:"teki", fr:"le crochet", note:"En bas du vertical, on comprime puis on détend vers le haut à gauche." },
  { n:5, jp:"策", r:"saku", fr:"le fouet", note:"Petit horizontal montant vers la droite, rapide, la pointe s'allège." },
  { n:6, jp:"掠", r:"ryaku", fr:"le balayage", note:"Longue diagonale vers le bas à gauche, qui s'amincit jusqu'à la pointe." },
  { n:7, jp:"啄", r:"taku", fr:"le coup de bec", note:"Courte diagonale à gauche, vive et nette." },
  { n:8, jp:"磔", r:"taku", fr:"la coupe", note:"Diagonale vers le bas à droite : on appuie en avançant, puis on quitte le papier." },
];

// Séries proposées sur la feuille d'entraînement.
const CALLI_SETS = [
  { id:"eight", jp:"永", fr:"Les huit traits de 永", chars:["永"] },
  { id:"ichi",  jp:"一二三", fr:"Les trois premiers nombres", chars:["一","二","三"] },
  { id:"nature",jp:"山川木火水", fr:"Éléments et nature", chars:["山","川","木","火","水","土"] },
  { id:"hito",  jp:"人大小", fr:"Le corps et la taille", chars:["人","大","小","口","心"] },
  { id:"hira",  jp:"あいうえお", fr:"Hiragana — rangée あ", chars:["あ","い","う","え","お"] },
  { id:"kata",  jp:"アイウエオ", fr:"Katakana — rangée ア", chars:["ア","イ","ウ","エ","オ"] },
  { id:"mots",  jp:"日本語", fr:"Trois kanji des leçons", chars:["日","本","語"] },
];
