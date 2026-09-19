/* =========================================================
   AUDIO CORNER v0.3
========================================================= */


/* =========================================================
   NAVIGATION
========================================================= */

const pages = document.querySelectorAll(".page");
const tabs = document.querySelectorAll(".tab");
const pageButtons = document.querySelectorAll("[data-page]");


function openPage(pageName) {

    pages.forEach(page => {
        page.classList.remove("active");
    });

    tabs.forEach(tab => {
        tab.classList.remove("active");
    });

    const page = document.getElementById(pageName);

    if (!page) {
        return;
    }

    page.classList.add("active");

    const tab = document.querySelector(
        `.tab[data-page="${pageName}"]`
    );

    if (tab) {
        tab.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


pageButtons.forEach(button => {

    button.addEventListener("click", () => {

        openPage(button.dataset.page);

    });

});


/* =========================================================
   MIDLÅDA - VISA / DÖLJ INSTÄLLNINGAR
========================================================= */

const middboxSelect =
    document.getElementById("setupMiddbox");

if (middboxSelect) {

    const middboxOptions =
        document.getElementById("middboxOptions");


    function updateMiddboxVisibility() {

        if (!middboxOptions) {
            return;
        }

        if (middboxSelect.value === "none") {

            middboxOptions.classList.add("hidden");

        } else {

            middboxOptions.classList.remove("hidden");

        }
    }


    middboxSelect.addEventListener(
        "change",
        updateMiddboxVisibility
    );


    updateMiddboxVisibility();
}


/* =========================================================
   GAIN
========================================================= */

function calculateGain() {

    const power =
        Number(
            document.getElementById("gainPower").value
        );

    const ohm =
        Number(
            document.getElementById("gainOhm").value
        );

    const result =
        document.getElementById("gainResult");


    if (!power || power <= 0 || !ohm || ohm <= 0) {

        result.classList.remove("hidden");

        result.innerHTML = `
            ⚠️ Skriv in en giltig RMS-effekt och impedans.
        `;

        return;
    }


    const voltage =
        Math.sqrt(power * ohm);


    result.classList.remove("hidden");

    result.innerHTML = `

        <h3>⚡ Resultat</h3>

        <strong>Målspänning:</strong><br>

        <span style="font-size:28px;">
            ${voltage.toFixed(1)} V AC
        </span>

        <br><br>

        ${power} W RMS @ ${ohm} Ω

        <br><br>

        <strong>Vid mätning:</strong>

        <br>

        1. Koppla bort högtalaren.

        <br>

        2. Använd rätt testton.

        <br>

        3. Mät AC-spänningen vid slutstegets utgång.

        <br>

        4. Öka gain tills du når målspänningen.

        <br><br>

        ⚠️ Om testtonen eller källsignalen redan är distad
        kan gain-inställningen bli fel.

    `;
}


/* =========================================================
   DSP
========================================================= */

function showDSP(type) {

    const result =
        document.getElementById("dspResult");


    const data = {

        sub: {

            title: "🔊 SUBWOOFER",

            text: `

                <strong>HPF / Subsonic:</strong>
                20–30 Hz

                <br>

                <strong>LPF:</strong>
                70–90 Hz

                <br>

                <strong>Slope:</strong>
                Börja runt 24 dB/oct

                <br>

                <strong>EQ:</strong>
                Börja på 0 dB

                <br>

                <strong>Fas:</strong>
                Testa 0° och 180°

                <br>

                <strong>Delay:</strong>
                Justeras efter placering och lyssningsposition.

                <br><br>

                <strong>Lyssna efter:</strong>

                <br>

                Basen ska kännas som en del av frontsystemet.
                Om basen tydligt låter som att den kommer från bagaget
                kan delningen, fasen eller tidskompensationen behöva justeras.

            `
        },


        midbass: {

            title: "🔈 MIDDBAS",

            text: `

                <strong>HPF:</strong>
                70–100 Hz

                <br>

                <strong>LPF:</strong>
                cirka 2 500–4 000 Hz

                <br>

                <strong>EQ:</strong>
                Börja neutralt.

                <br>

                <strong>Gain:</strong>
                Ställ innan du börjar boosta med EQ.

                <br><br>

                <strong>Om middarna slår hårt:</strong>

                <br>

                Kontrollera HPF, gain och eventuell distortion
                innan du börjar ändra EQ.

            `
        },


        midrange: {

            title: "🎵 MELLANREGISTER",

            text: `

                <strong>HPF:</strong>
                cirka 250–500 Hz

                <br>

                <strong>LPF:</strong>
                cirka 2 500–4 000 Hz

                <br>

                Mellanregistret innehåller mycket av informationen
                i röster, gitarrer och många instrument.

                <br><br>

                För mycket energi här kan göra ljudet hårt eller
                "burkigt".

            `
        },


        tweeter: {

            title: "📣 DISKANT",

            text: `

                <strong>HPF:</strong>
                ofta cirka 2 500–5 000 Hz

                <br>

                Exakt gräns beror på diskanten och dess konstruktion.

                <br><br>

                Om diskanten har ett passivt filter eller en
                kondensator ska du ta hänsyn till det.

                <br><br>

                <strong>Viktigt:</strong>

                Börja hellre försiktigt än att skicka för mycket
                effekt eller för låga frekvenser till diskanten.

            `
        }

    };


    const selected = data[type];


    if (!selected) {
        return;
    }


    result.classList.remove("hidden");

    result.innerHTML = `

        <h3>${selected.title}</h3>

        ${selected.text}

    `;
}


/* =========================================================
   FILTER
========================================================= */

function showFilter(type) {

    const result =
        document.getElementById("filterResult");


    const filters = {

        sub: `

            <h3>🔊 Subwoofer</h3>

            <strong>LPF:</strong> 70–90 Hz

            <br>

            <strong>Subsonic:</strong> 20–30 Hz på portad låda

            <br><br>

            Börja runt 80 Hz och lyssna.

        `,

        mid: `

            <h3>🔈 Middbas</h3>

            <strong>HPF:</strong> 70–100 Hz

            <br>

            <strong>LPF:</strong> 2 500–4 000 Hz

            <br><br>

            Exakt delning beror på högtalarens egenskaper
            och vad som spelar ovanför.

        `,

        full: `

            <h3>🎵 Fullrange</h3>

            <strong>HPF:</strong> 70–100 Hz

            <br><br>

            Om högtalaren distar när du spelar mycket bas,
            höj HPF.

        `,

        tweeter: `

            <h3>📣 Diskant</h3>

            <strong>HPF:</strong> cirka 2 500–5 000 Hz

            <br><br>

            Kontrollera alltid diskantens specifikationer
            och eventuellt passivt filter.

        `

    };


    if (!filters[type]) {
        return;
    }


    result.classList.remove("hidden");

    result.innerHTML = filters[type];
}


/* =========================================================
   EQ
========================================================= */

function showEQ(type) {

    const result =
        document.getElementById("eqResult");


    const data = {

        bass: `
            <h3>🔊 20–80 Hz</h3>

            Djup bas och subbas.

            <br><br>

            Mer energi här ger djupare och tyngre bas.

            <br>

            För mycket kan belasta subwoofer och slutsteg
            kraftigt.
        `,

        midbass: `
            <h3>🔈 80–250 Hz</h3>

            Här finns mycket av trycket och kroppen i ljudet.

            <br><br>

            För mycket kan göra ljudet svullet eller grötigt.
        `,

        lowmid: `
            <h3>🎵 250–800 Hz</h3>

            Här finns mycket värme.

            <br><br>

            För mycket kan få ljudet att kännas instängt
            eller "burkigt".
        `,

        mid: `
            <h3>🎤 800 Hz–2,5 kHz</h3>

            Viktigt område för röster och instrument.

            <br><br>

            För mycket kan göra ljudet hårt och framfusigt.
        `,

        presence: `
            <h3>✨ 2,5–6 kHz</h3>

            Ger närvaro, attack och tydlighet.

            <br><br>

            För mycket är en vanlig orsak till att middar
            eller diskant upplevs som skrikiga.
        `,

        treble: `
            <h3>💎 6–20 kHz</h3>

            Diskant och "luft".

            <br><br>

            För mycket kan göra ljudet vasst eller tröttande.
        `

    };


    if (!data[type]) {
        return;
    }


    result.classList.remove("hidden");

    result.innerHTML = data[type];
}


/* =========================================================
   KOPPLA IN
========================================================= */

function showConnect(type) {

    const result =
        document.getElementById("connectResult");


    const data = {

        power: `

            <h3>🔴 PLUS & SÄKRING</h3>

            Batteriets plus går till slutstegets +12 V.

            <br><br>

            Säkringen ska sitta nära batteriet.

            <br><br>

            <strong>Viktigt:</strong>

            Säkringen skyddar framför allt kabeln vid kortslutning.
            Dimensionera inte en säkring enbart efter slutstegets
            maximala effekt.

        `,


        ground: `

            <h3>⚫ JORD</h3>

            Slutstegets jord ska anslutas till en bra jordpunkt
            i chassit.

            <br><br>

            Håll jordkabeln så kort som praktiskt möjligt.

            <br><br>

            Slipa bort lack där jordanslutningen ska sitta
            och se till att anslutningen blir mekaniskt stabil.

            <br><br>

            Dålig jord kan ge spänningsfall, störningar,
            protect-problem och startproblem.

        `,


        remote: `

            <h3>🟠 REMOTE</h3>

            Remote används normalt för att tala om för slutsteget
            att stereon är på.

            <br><br>

            När stereon är aktiv ska remote vanligtvis ha ungefär
            samma spänning som systemets matningsspänning.

            <br><br>

            Ingen remote = slutsteget kan förbli avstängt även
            om +12 V och jord är korrekta.

        `,


        rca: `

            <h3>🔵 RCA / SIGNAL</h3>

            RCA transporterar lågnivåsignalen från stereo eller DSP
            till slutsteget.

            <br><br>

            Kontrollera:

            <br>• Rätt RCA-utgång
            <br>• Rätt RCA-ingång på slutsteget
            <br>• Vänster/höger
            <br>• Att stereon faktiskt skickar signal

        `,


        highlevel: `

            <h3>🟣 HÖGNIVÅ</h3>

            Högnivåsignal kommer direkt från stereons
            högtalarutgångar.

            <br><br>

            Den används ofta när originalstereon saknar RCA.

            <br><br>

            Kontrollera alltid slutstegets eller omvandlarens
            manual för rätt inkoppling.

        `,


        speaker: `

            <h3>🟢 HÖGTALARKABLAR</h3>

            Från slutstegets högtalarutgång går kabeln till
            högtalaren.

            <br><br>

            Kontrollera alltid:

            <br>• + och –
            <br>• Höger/vänster
            <br>• Rätt impedans
            <br>• Att slutsteget klarar belastningen

            <br><br>

            Fel polaritet kan göra att högtalare arbetar mot
            varandra och ge dålig bas.

        `,


        stereo: `

            <h3>📻 BYTA / KOPPLA STEREO</h3>

            Innan du börjar:

            <br><br>

            1. Koppla bort batteriets minus om installationen
            kräver det.

            <br>

            2. Identifiera konstant +12 V.

            <br>

            3. Identifiera tändnings-/ACC-signal om bilen använder en sådan.

            <br>

            4. Identifiera jord.

            <br>

            5. Använd rätt adapter för bilens originalkablage.

            <br><br>

            Moderna bilar kan använda CAN-bus och andra
            fordonsnätverk. Koppla därför inte ihop okända kablar
            bara efter färg.

        `

    };


    if (!data[type]) {
        return;
    }


    result.classList.remove("hidden");

    result.innerHTML = data[type];
}


/* =========================================================
   FELSÖKNING
========================================================= */

function showTrouble(type) {

    const result =
        document.getElementById("troubleResult");


    const troubleData = {

        ampdead: {
            title: "⚫ Slutsteget startar inte",

            html: `

                <h3>Slutsteget är helt dött?</h3>

                <p>
                    Felsök i denna ordning:
                </p>


                <div class="diagnostic-step">

                    <strong>
                        1. Kontrollera huvudsäkringen
                    </strong>

                    <p>
                        Kontrollera säkringen nära batteriet.
                        Mät den om du har multimeter.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        2. Kontrollera +12 V
                    </strong>

                    <p>
                        Mät mellan slutstegets +12V och GND.
                        Du ska normalt ha ungefär batteriets spänning.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        3. Kontrollera jord
                    </strong>

                    <p>
                        Jorden ska sitta hårt mot ren karossplåt.
                        Kontrollera kabelsko och kontaktpunkt.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        4. Kontrollera REM
                    </strong>

                    <p>
                        Mät mellan REM och GND när stereon är på.
                        REM ska normalt ligga omkring 12 V.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        5. Kontrollera slutstegets säkringar
                    </strong>

                    <p>
                        Vissa slutsteg har egna säkringar.
                        Kontrollera även dessa.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        6. Har du DSP eller LOC?
                    </strong>

                    <p>
                        Om slutsteget startas via DSP/LOC kan
                        startsignalen saknas därifrån.
                    </p>

                </div>


                <div class="diagnostic-result">

                    <strong>
                        🔎 Tolkning
                    </strong>

                    <p>
                        <strong>Ingen +12 V:</strong>
                        felsök batterikabel, huvudsäkring och kabeldragning.
                    </p>

                    <p>
                        <strong>+12 V men ingen REM:</strong>
                        felsök stereo, DSP/LOC eller remote-kabel.
                    </p>

                    <p>
                        <strong>
                            +12 V och REM finns men slutsteget är dött:
                        </strong>
                        misstänk jordproblem, intern säkring eller fel i slutsteget.
                    </p>

                </div>


                <div class="warning">

                    ⚠️ Byt aldrig till en större säkring
                    bara för att en säkring går.

                </div>

            `
        },


        protect: {
            title: "🔴 Slutsteget går i PROTECT",

            html: `

                <h3>
                    PROTECT betyder att slutsteget skyddar sig.
                </h3>


                <div class="diagnostic-step">

                    <strong>
                        1. Stäng av systemet
                    </strong>

                    <p>
                        Stäng av stereon innan du börjar koppla om.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        2. Kontrollera högtalarkablarna
                    </strong>

                    <p>
                        Leta efter kortslutning, lösa kabeltrådar
                        eller kabel mot karossen.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        3. Kontrollera impedansen
                    </strong>

                    <p>
                        För låg impedans kan få slutsteget
                        att gå i protect.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        4. Kontrollera temperaturen
                    </strong>

                    <p>
                        Är slutsteget mycket varmt?
                        Låt det svalna och kontrollera ventilationen.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        5. Koppla bort högtalarna
                    </strong>

                    <p>
                        Om protect kvarstår utan högtalarlast
                        kan felet ligga i strömförsörjningen
                        eller slutsteget.
                    </p>

                </div>

            `
        },


        nosignal: {
            title: "🔇 Slutsteget startar men inget ljud",

            html: `

                <h3>
                    POWER lyser men högtalarna är tysta.
                </h3>


                <div class="diagnostic-step">

                    <strong>
                        1. Kontrollera stereon
                    </strong>

                    <p>
                        Kontrollera mute, volym, fader och balans.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        2. Kontrollera RCA/högnivå
                    </strong>

                    <p>
                        Kontrollera att signalen verkligen går
                        från stereon/DSP till slutsteget.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        3. Kontrollera input-läge
                    </strong>

                    <p>
                        Kontrollera exempelvis 2CH/4CH
                        eller annan input-inställning.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        4. Kontrollera gain
                    </strong>

                    <p>
                        Kontrollera att gain inte står helt nedvriden.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        5. Kontrollera filter
                    </strong>

                    <p>
                        HPF/LPF kan vara inställt så att högtalaren
                        inte får rätt frekvenser.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        6. Kontrollera högtalarkablarna
                    </strong>

                    <p>
                        Kontrollera plus, minus och eventuella
                        bryggkopplingar.
                    </p>

                </div>

            `
        },


        oneside: {
            title: "↔️ Bara ena sidan spelar",

            html: `

                <h3>
                    En högtalare eller sida fungerar inte.
                </h3>


                <div class="diagnostic-step">

                    <strong>
                        1. Kontrollera balans
                    </strong>

                    <p>
                        Kontrollera att stereons balans inte är
                        ställd helt åt ena sidan.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        2. Byt RCA vänster/höger
                    </strong>

                    <p>
                        Byt plats på vänster och höger RCA.
                        Flyttar felet sig ligger problemet före slutsteget.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        3. Kontrollera högtalarkabel
                    </strong>

                    <p>
                        Kontrollera kabel, kabelsko och anslutning
                        vid högtalaren.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        4. Testa högtalaren på en annan kanal
                    </strong>

                    <p>
                        Om felet följer högtalaren kan själva
                        högtalaren eller kabeln vara problemet.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        5. Kontrollera DSP-routing
                    </strong>

                    <p>
                        Kontrollera att båda kanalerna faktiskt
                        skickas till rätt utgång.
                    </p>

                </div>

            `
        },


        distortion: {
            title: "💥 Ljudet distar",

            html: `

                <h3>
                    Distorsion kan komma från flera delar av systemet.
                </h3>


                <div class="diagnostic-step">

                    <strong>
                        1. Sänk gain
                    </strong>

                    <p>
                        För hög gain är en vanlig orsak till distorsion.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        2. Kontrollera stereons volym
                    </strong>

                    <p>
                        En överstyrd signal från stereon kan redan
                        vara distad innan den når slutsteget.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        3. Kontrollera DSP/EQ
                    </strong>

                    <p>
                        Stora EQ-boostar kan överstyra signalen.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        4. Kontrollera HPF
                    </strong>

                    <p>
                        Om en dörrmidd får för mycket djupbas
                        kan den bottna och börja låta illa.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        5. Kontrollera slutstegets belastning
                    </strong>

                    <p>
                        För låg impedans kan göra att slutsteget
                        arbetar utanför vad det är avsett för.
                    </p>

                </div>

            `
        },


        scream: {
            title: "😱 Middarna skriker",

            html: `

                <h3>
                    Mellanregistret låter vasst, hårt eller skrikigt.
                </h3>


                <div class="diagnostic-step">

                    <strong>
                        1. Kontrollera området 1–4 kHz
                    </strong>

                    <p>
                        För mycket energi här kan göra röster
                        och middar väldigt aggressiva.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        2. Kontrollera EQ
                    </strong>

                    <p>
                        Prova att minska istället för att höja.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        3. Kontrollera gain
                    </strong>

                    <p>
                        För hög gain kan göra att middarna
                        upplevs hårda och pressade.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        4. Kontrollera LPF
                    </strong>

                    <p>
                        Om middarna spelar för högt upp i frekvens
                        kan de bli aggressiva.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        5. Kontrollera diskanten
                    </strong>

                    <p>
                        Problemet kan egentligen komma från
                        tweetersystemet.
                    </p>

                </div>

            `
        },


        hard: {
            title: "🔊 Högtalaren slår för hårt",

            html: `

                <h3>
                    Högtalaren rör sig för mycket eller låter mekaniskt.
                </h3>


                <div class="diagnostic-step">

                    <strong>
                        1. Kontrollera HPF
                    </strong>

                    <p>
                        En middbas bör normalt inte få för mycket djupbas.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        2. Höj HPF försiktigt
                    </strong>

                    <p>
                        Prova exempelvis från 60 Hz mot 80–100 Hz
                        beroende på högtalare och installation.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        3. Kontrollera EQ
                    </strong>

                    <p>
                        Stora boostar i basområdet kan få elementet
                        att slå mycket.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        4. Kontrollera gain
                    </strong>

                    <p>
                        För hög nivå kan göra att elementet arbetar
                        utanför sitt linjära område.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        5. Kontrollera dörren
                    </strong>

                    <p>
                        En dåligt tätad eller ostabil dörr kan
                        påverka hur middbasen arbetar.
                    </p>

                </div>

            `
        },


        nobass: {
            title: "❌ Ingen bas",

            html: `

                <h3>
                    Subwoofern spelar inte eller basen saknas.
                </h3>


                <div class="diagnostic-step">

                    <strong>
                        1. Kontrollera subwooferns kabel
                    </strong>

                    <p>
                        Kontrollera plus och minus vid både
                        slutsteg och subwoofer.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        2. Kontrollera LPF
                    </strong>

                    <p>
                        Subkanalen måste få ett relevant
                        frekvensområde.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        3. Kontrollera DSP-routing
                    </strong>

                    <p>
                        Kontrollera att sub-signalen faktiskt
                        skickas till subutgången.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        4. Testa fas/polaritet
                    </strong>

                    <p>
                        Fel fas eller polaritet kan göra att
                        sub och framhögtalare motverkar varandra.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        5. Kontrollera gain
                    </strong>

                    <p>
                        Kontrollera att subkanalens nivå inte
                        är neddragen.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        6. Kontrollera bryggkoppling
                    </strong>

                    <p>
                        Om slutsteget är bryggat måste högtalaren
                        vara ansluten enligt tillverkarens kopplingsschema.
                    </p>

                </div>

            `
        },


        boomy: {
            title: "🌊 Basen är grötig",

            html: `

                <h3>
                    Basen är för svullen eller otydlig.
                </h3>


                <div class="diagnostic-step">

                    <strong>
                        1. Kontrollera LPF
                    </strong>

                    <p>
                        En för hög LPF kan göra att subwoofern
                        tar över för mycket av mellanbasen.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        2. Kontrollera EQ
                    </strong>

                    <p>
                        För mycket boost kan göra basen svullen.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        3. Kontrollera fas
                    </strong>

                    <p>
                        Testa olika faslägen och lyssna på
                        övergången mellan sub och frontsystem.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        4. Kontrollera lådan
                    </strong>

                    <p>
                        För portade lådor påverkar lådvolym
                        och avstämning ljudets karaktär kraftigt.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        5. Kontrollera tidskompensation
                    </strong>

                    <p>
                        DSP-delay kan påverka hur sub och
                        frontsystem smälter ihop.
                    </p>

                </div>

            `
        },


        fuse: {
            title: "💣 Säkringen går",

            html: `

                <h3>
                    En säkring som går ska alltid undersökas.
                </h3>


                <div class="diagnostic-step">

                    <strong>
                        1. Byt inte till större säkring
                    </strong>

                    <p>
                        En större säkring kan innebära att
                        kabeln inte längre är tillräckligt skyddad.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        2. Kontrollera +12 V-kabeln
                    </strong>

                    <p>
                        Leta efter skador, klämskador och
                        kabel som ligger mot karossen.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        3. Kontrollera anslutningarna
                    </strong>

                    <p>
                        Lösa eller skadade anslutningar
                        kan orsaka problem.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        4. Koppla bort slutsteget
                    </strong>

                    <p>
                        Om säkringen håller utan slutsteget
                        behöver du felsöka installationen
                        eller slutsteget.
                    </p>

                </div>


                <div class="diagnostic-step">

                    <strong>
                        5. Kontrollera slutsteget
                    </strong>

                    <p>
                        Ett internt fel kan orsaka mycket
                        hög strömförbrukning.
                    </p>

                </div>

            `
        }

    };


    if (!troubleData[type]) {

        result.innerHTML =
            "<p>Felsökning saknas just nu för detta steg.</p>";

        result.classList.remove("hidden");

        return;
    }


    result.innerHTML = `

        <h2>
            ${troubleData[type].title}
        </h2>

        ${troubleData[type].html}

    `;


    result.classList.remove("hidden");


    result.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* =========================================================
   LÄR DIG
========================================================= */

function showLearn(type) {

    const result =
        document.getElementById("learnResult");


    const data = {

        sub: `

            <h3>🔊 VAD ÄR EN SUBWOOFER?</h3>

            En subwoofer är byggd för de lägsta frekvenserna
            i musiken.

            <br><br>

            Den arbetar vanligtvis ungefär från 20–100 Hz,
            beroende på systemet.

            <br><br>

            <strong>Uppgift:</strong>

            Ge systemet djup och fysisk bas.

            <br><br>

            Därför behöver subwoofern ofta ett eget slutsteg
            och en lämplig baslåda.

        `,


        midbass: `

            <h3>🔈 VAD ÄR MIDDBAS?</h3>

            Middbasen sitter ofta i bilens dörrar.

            <br><br>

            Den spelar området ovanför subwoofern och ger
            mycket av känslan av "tryck" i musiken.

            <br><br>

            Exempel:

            trummor, basgitarr och attack i musik.

            <br><br>

            En bra middbas behöver inte bara mycket effekt.
            Montering, dörrens konstruktion och rätt filter
            spelar stor roll.

        `,


        midrange: `

            <h3>🎤 VAD ÄR MELLANREGISTER?</h3>

            Mellanregistret är området där mycket av
            musikens viktigaste information finns.

            <br><br>

            Röster, gitarrer, piano och många andra instrument
            har mycket energi här.

            <br><br>

            Därför påverkar mellanregistret starkt hur
            naturligt ljudet upplevs.

        `,


        tweeter: `

            <h3>📣 VAD ÄR EN DISKANT?</h3>

            Diskanten spelar de högsta frekvenserna.

            <br><br>

            Den står bland annat för detaljer, cymbaler,
            övertoner och "luft".

            <br><br>

            Diskanter är normalt mycket känsligare för
            låga frekvenser än middbasar och subwoofers.

        `,


        amp: `

            <h3>⚡ VAD GÖR ETT SLUTSTEG?</h3>

            En stereo kan skicka en ljudsignal men har begränsad
            effekt.

            <br><br>

            Slutsteget tar signalen och använder bilens
            elsystem för att driva högtalaren med betydligt
            mer effekt.

            <br><br>

            Därför behöver slutsteget:

            <br>

            • +12 V

            <br>

            • Jord

            <br>

            • Remote/startsignal

            <br>

            • Ljudsignal

            <br>

            • Högtalare

        `,


        dsp: `

            <h3>🎛️ VAD GÖR EN DSP?</h3>

            DSP betyder Digital Signal Processor.

            <br><br>

            Den kan bearbeta ljudsignalen innan den går vidare
            till slutstegen.

            <br><br>

            En DSP kan exempelvis göra:

            <br>

            • HPF / LPF

            <br>

            • EQ

            <br>

            • Tidskompensation

            <br>

            • Fasjustering

            <br>

            • Kanalnivåer

            <br><br>

            En DSP kan därför användas för att få flera
            högtalare att samarbeta bättre.

        `,


        rms: `

            <h3>📐 VAD BETYDER RMS?</h3>

            RMS används för att beskriva kontinuerlig effekt
            på ett användbart sätt.

            <br><br>

            När en högtalare anges till exempelvis
            300 W RMS betyder det inte att den alltid ska
            matas med exakt 300 W.

            <br><br>

            RMS är en viktig specifikation när man matchar
            högtalare och slutsteg.

        `,


        impedance: `

            <h3>Ω VAD ÄR IMPEDANS?</h3>

            Impedans anges i ohm.

            <br><br>

            Lägre impedans innebär normalt att ett slutsteg
            måste leverera mer ström.

            <br><br>

            Exempel:

            <br>

            4 Ω → lättare belastning

            <br>

            2 Ω → högre belastning

            <br>

            1 Ω → ännu högre belastning

            <br><br>

            Därför måste slutsteget vara byggt för den impedans
            du ansluter.

        `,


        gain: `

            <h3>⚡ VAD ÄR GAIN?</h3>

            Gain bestämmer hur mycket slutsteget förstärker
            insignalen.

            <br><br>

            Gain är <strong>inte</strong> samma sak som en vanlig
            volymkontroll.

            <br><br>

            För hög gain kan göra att systemet klipper
            och distar.

            <br><br>

            Målet är att matcha signalnivåerna så att slutsteget
            kan ge önskad effekt utan onödig clipping.

        `,


        filters: `

            <h3>🎚️ HPF & LPF</h3>

            <strong>HPF</strong> betyder High Pass Filter.

            <br>

            Det släpper igenom frekvenser över vald gräns.

            <br><br>

            <strong>LPF</strong> betyder Low Pass Filter.

            <br>

            Det släpper igenom frekvenser under vald gräns.

            <br><br>

            Exempel:

            <br>

            En sub med LPF 80 Hz spelar huvudsakligen
            området under 80 Hz.

        `,


        signal: `

            <h3>🔗 SIGNALVÄGEN</h3>

            En enkel anläggning kan se ut så här:

            <br><br>

            <strong>Musik</strong>

            ↓

            <br>

            <strong>Stereo</strong>

            ↓

            <br>

            <strong>DSP / signalprocessor</strong>

            ↓

            <br>

            <strong>Slutsteg</strong>

            ↓

            <br>

            <strong>Högtalare</strong>

            <br><br>

            Samtidigt behöver slutsteget ström från bilens
            elsystem.

            <br><br>

            När du felsöker är det därför smart att följa
            signalen steg för steg.

        `

    };


    if (!data[type]) {
        return;
    }


    result.classList.remove("hidden");

    result.innerHTML = data[type];
}


/* =========================================================
   KABEL
========================================================= */

function calculateCable() {

    const power =
        Number(
            document.getElementById("cablePower").value
        );

    const voltage =
        Number(
            document.getElementById("cableVoltage").value
        );

    const efficiency =
        Number(
            document.getElementById("ampClass").value
        );

    const result =
        document.getElementById("cableResult");


    if (!power || power <= 0) {

        result.classList.remove("hidden");

        result.innerHTML =
            "⚠️ Skriv in slutstegets RMS-effekt.";

        return;
    }


    const current =
        power / (voltage * efficiency);


    let cable;


    if (current <= 20) {

        cable = "10 mm²";

    } else if (current <= 40) {

        cable = "16 mm²";

    } else if (current <= 60) {

        cable = "25 mm²";

    } else if (current <= 100) {

        cable = "35 mm²";

    } else if (current <= 150) {

        cable = "50 mm²";

    } else {

        cable = "70 mm² eller större";

    }


    result.classList.remove("hidden");

    result.innerHTML = `

        <h3>🔌 Resultat</h3>

        <strong>Beräknad ström:</strong>

        ${current.toFixed(0)} A

        <br><br>

        <strong>Grov kabelrekommendation:</strong>

        ${cable}

        <br><br>

        ⚠️ Kontrollera alltid kabelns faktiska
        strömkapacitet, längd och slutstegets manual.

    `;
}


/* =========================================================
   BASLÅDA
========================================================= */

function calculateBox() {

    const width =
        Number(
            document.getElementById("boxWidth").value
        );

    const height =
        Number(
            document.getElementById("boxHeight").value
        );

    const depth =
        Number(
            document.getElementById("boxDepth").value
        );

    const displacement =
        Number(
            document.getElementById("boxDisplacement").value
        ) || 0;


    const result =
        document.getElementById("boxResult");


    if (!width || !height || !depth) {

        result.classList.remove("hidden");

        result.innerHTML =
            "⚠️ Fyll i alla mått.";

        return;
    }


    const gross =
        (width * height * depth) / 1000;


    const net =
        gross - displacement;


    result.classList.remove("hidden");

    result.innerHTML = `

        <h3>📦 Resultat</h3>

        <strong>Bruttovolym:</strong>

        ${gross.toFixed(1)} liter

        <br><br>

        <strong>Ungefärlig nettovolym:</strong>

        ${net.toFixed(1)} liter

        <br><br>

        Element, port och stag måste räknas bort
        om du vill få en mer korrekt nettovolym.

    `;
}


/* =========================================================
   IMPEDANS
========================================================= */

function calculateImpedance() {

    const r1 =
        Number(
            document.getElementById("imp1").value
        );

    const r2 =
        Number(
            document.getElementById("imp2").value
        );

    const connection =
        document.getElementById("impConnection").value;


    const result =
        document.getElementById("impedanceResult");


    if (!r1 || r1 <= 0 || !r2 || r2 <= 0) {

        result.classList.remove("hidden");

        result.innerHTML =
            "⚠️ Ange två giltiga impedanser.";

        return;
    }


    let total;


    if (connection === "parallel") {

        total =
            (r1 * r2) /
            (r1 + r2);

    } else {

        total =
            r1 + r2;

    }


    result.classList.remove("hidden");

    result.innerHTML = `

        <h3>Ω Resultat</h3>

        <strong>Total impedans:</strong>

        <br>

        <span style="font-size:28px;">
            ${total.toFixed(2)} Ω
        </span>

        <br><br>

        ${connection === "parallel"
            ? "Parallellkoppling"
            : "Seriekoppling"}

    `;
}


/* =========================================================
   DSP WIZARD
========================================================= */

function runDSPWizard() {

    const type =
        document.getElementById("wizardType").value;

    const result =
        document.getElementById("wizardResult");


    let html = "";


    /* =====================================================
       SUBWOOFER
    ===================================================== */

    if (type === "sub") {

        const power =
            Number(
                document.getElementById(
                    "wizardPower"
                ).value
            ) || 0;


        const ohm =
            Number(
                document.getElementById(
                    "wizardOhm"
                ).value
            );


        const box =
            document.getElementById(
                "wizardBox"
            ).value;


        const tuning =
            Number(
                document.getElementById(
                    "wizardTuning"
                ).value
            ) || 35;


        let voltage = null;


        if (power > 0 && ohm > 0) {

            voltage =
                Math.sqrt(power * ohm);

        }


        let subsonic =
            "Ej relevant för sluten låda";


        if (box === "ported") {

            const suggested =
                Math.max(
                    20,
                    tuning - 5
                );

            const upper =
                Math.max(
                    20,
                    tuning - 2
                );

            subsonic =
                `${suggested}–${upper} Hz`;

        }


        html = `

            <h3>
                🔊 SUBWOOFER
            </h3>


            <div class="setup-summary">

                <div class="setup-line">
                    <span>LPF</span>
                    <strong>70–90 Hz</strong>
                </div>


                <div class="setup-line">
                    <span>Lutning</span>
                    <strong>18–24 dB/okt</strong>
                </div>


                <div class="setup-line">
                    <span>Subsonic</span>
                    <strong>${subsonic}</strong>
                </div>


                <div class="setup-line">
                    <span>EQ</span>
                    <strong>Flat / 0 dB</strong>
                </div>


                <div class="setup-line">
                    <span>Fas</span>
                    <strong>0° – börja här</strong>
                </div>


                ${
                    voltage !== null
                    ?
                    `
                    <div class="setup-line">

                        <span>
                            Gain målspänning
                        </span>

                        <strong>
                            ${voltage.toFixed(1)} V AC
                        </strong>

                    </div>
                    `
                    :
                    ""
                }

            </div>


            <div class="info-box">

                <strong>
                    💡 Inställningsordning
                </strong>

                <p>
                    Filter → gain → fas →
                    nivå → EQ.
                </p>

            </div>


            <div class="warning">

                ⚠️ Inställningarna är startvärden.
                Exakt delning och subsonic beror på
                element, låda, avstämning och resten av systemet.

            </div>

        `;

    }


    /* =====================================================
       MIDDLÅDA
    ===================================================== */

    if (type === "midd") {

        html = `

            <h3>
                🔊 MIDDLÅDA
            </h3>


            <div class="setup-summary">

                <div class="setup-line">
                    <span>HPF</span>
                    <strong>70–100 Hz</strong>
                </div>


                <div class="setup-line">
                    <span>LPF</span>
                    <strong>2 000–4 000 Hz</strong>
                </div>


                <div class="setup-line">
                    <span>Lutning</span>
                    <strong>18–24 dB/okt</strong>
                </div>


                <div class="setup-line">
                    <span>EQ</span>
                    <strong>Flat / 0 dB</strong>
                </div>


                <div class="setup-line">
                    <span>Fas</span>
                    <strong>0° – börja här</strong>
                </div>

            </div>


            <div class="info-box">

                <strong>
                    ⚠️ Viktigt
                </strong>

                <p>
                    Exakt delning beror på element,
                    horn/diskant och hur lådan spelar.
                    Använd detta som startpunkt,
                    inte som ett universellt facit.
                </p>

            </div>

        `;

    }


    /* =====================================================
       FRONTSYSTEM
    ===================================================== */

    if (type === "front") {

        html = `

            <h3>
                🚗 FRONTSYSTEM
            </h3>


            <div class="setup-summary">

                <div class="setup-line">
                    <span>HPF</span>
                    <strong>70–100 Hz</strong>
                </div>


                <div class="setup-line">
                    <span>Lutning</span>
                    <strong>12–24 dB/okt</strong>
                </div>


                <div class="setup-line">
                    <span>EQ</span>
                    <strong>Flat / 0 dB</strong>
                </div>


                <div class="setup-line">
                    <span>Fader</span>
                    <strong>0</strong>
                </div>


                <div class="setup-line">
                    <span>Balance</span>
                    <strong>0</strong>
                </div>

            </div>


            <div class="info-box">

                <strong>
                    💡 Startpunkt
                </strong>

                <p>
                    Börja med neutrala nivåer och ställ
                    delningsfiltret innan du börjar använda EQ.
                </p>

            </div>

        `;

    }


    /* =====================================================
       DISKANT
    ===================================================== */

    if (type === "tweeter") {

        html = `

            <h3>
                🔔 DISKANT
            </h3>


            <div class="setup-summary">

                <div class="setup-line">

                    <span>HPF</span>

                    <strong>
                        Följ tillverkarens rekommenderade delning
                    </strong>

                </div>


                <div class="setup-line">

                    <span>Lutning</span>

                    <strong>
                        12–24 dB/okt
                    </strong>

                </div>


                <div class="setup-line">

                    <span>EQ</span>

                    <strong>
                        Flat / 0 dB
                    </strong>

                </div>


                <div class="setup-line">

                    <span>Nivå</span>

                    <strong>
                        0 dB – justera efter behov
                    </strong>

                </div>

            </div>


            <div class="info-box">

                <strong>
                    ⚠️ Diskant
                </strong>

                <p>
                    Sätt inte en godtycklig låg
                    delningsfrekvens. Diskantens
                    rekommenderade minimum ska alltid
                    respekteras.
                </p>

            </div>

        `;

    }


    if (!html) {

        html = `
            <div class="warning">
                ⚠️ Välj en komponent för att skapa
                en rekommenderad startinställning.
            </div>
        `;

    }


    result.classList.remove("hidden");

    result.innerHTML = html;
}


/* =========================================================
   MIN ANLÄGGNING
========================================================= */

function buildSetup() {

    const stereo =
        document.getElementById("setupStereo").value;

    const dsp =
        document.getElementById("setupDSP").value;

    const front =
        document.getElementById("setupFront").value;

    const amp =
        document.getElementById("setupAmp").value;

    const sub =
        document.getElementById("setupSub").value;

    const subPower =
        Number(
            document.getElementById("setupSubPower").value
        ) || 0;

    const subOhm =
        Number(
            document.getElementById("setupSubOhm").value
        );

    const middbox =
        document.getElementById("setupMiddbox").value;

    const result =
        document.getElementById("setupResult");


    /* =====================================================
       SUBWOOFER
    ===================================================== */

    let subSettings = "";


    if (sub === "none") {

        subSettings = `

            <div class="setup-line">

                <span>
                    Subwoofer
                </span>

                <strong>
                    Ingen
                </strong>

            </div>

        `;

    } else {

        let voltage = null;


        if (subPower > 0 && subOhm > 0) {

            voltage =
                Math.sqrt(
                    subPower * subOhm
                );

        }


        subSettings = `

            <div class="setup-line">

                <span>
                    Subwoofer
                </span>

                <strong>
                    ${sub === "one"
                        ? "1 st"
                        : "2 st"}
                </strong>

            </div>


            <div class="setup-line">

                <span>
                    Sub RMS
                </span>

                <strong>
                    ${subPower > 0
                        ? subPower + " W"
                        : "Ej angivet"}
                </strong>

            </div>


            <div class="setup-line">

                <span>
                    Sub impedans
                </span>

                <strong>
                    ${subOhm} Ω
                </strong>

            </div>


            ${
                voltage !== null
                ?
                `
                <div class="setup-line">

                    <span>
                        Gain målspänning
                    </span>

                    <strong>
                        ${voltage.toFixed(1)} V AC
                    </strong>

                </div>
                `
                :
                ""
            }


            <div class="setup-line">

                <span>
                    Sub LPF
                </span>

                <strong>
                    70–90 Hz
                </strong>

            </div>


            <div class="setup-line">

                <span>
                    Subsonic
                </span>

                <strong>
                    Beror på lådans avstämning
                </strong>

            </div>


            <div class="setup-line">

                <span>
                    Filterlutning
                </span>

                <strong>
                    18–24 dB/okt
                </strong>

            </div>

        `;
    }


    /* =====================================================
       FRONTSYSTEM
    ===================================================== */

    let frontSettings = "";


    if (front === "mid_tweeter") {

        frontSettings = `

            <div class="setup-line">

                <span>
                    Front HPF
                </span>

                <strong>
                    70–100 Hz
                </strong>

            </div>


            <div class="setup-line">

                <span>
                    Midd LPF
                </span>

                <strong>
                    2 500–4 000 Hz
                </strong>

            </div>


            <div class="setup-line">

                <span>
                    Diskant
                </span>

                <strong>
                    Följ rekommenderad delning
                </strong>

            </div>

        `;

    } else {

        frontSettings = `

            <div class="setup-line">

                <span>
                    Front HPF
                </span>

                <strong>
                    70–100 Hz
                </strong>

            </div>

        `;
    }


    /* =====================================================
       MIDDLÅDA
    ===================================================== */

    let middSettings = "";


    if (middbox !== "none") {

        const count =
            Number(
                document.getElementById(
                    "setupMiddCount"
                ).value
            ) || 0;


        const size =
            document.getElementById(
                "setupMiddSize"
            ).value;


        const power =
            Number(
                document.getElementById(
                    "setupMiddPower"
                ).value
            ) || 0;


        const ohm =
            Number(
                document.getElementById(
                    "setupMiddOhm"
                ).value
            );


        const role =
            document.getElementById(
                "setupMiddRole"
            ).value;


        const totalPower =
            count * power;


        let roleName =
            "Midbass + midrange";


        if (role === "midbass") {

            roleName =
                "Midbass";

        }


        if (role === "midrange") {

            roleName =
                "Midrange";

        }


        let connectionText =
            "Kontrollera kopplingen mot slutstegets minsta impedans";


        if (count === 2) {

            connectionText =
                `${ohm * 2} Ω serie eller ${ohm / 2} Ω parallellt`;

        }


        if (count === 4) {

            connectionText =
                `4 × ${ohm} Ω – vanlig serie/parallellkoppling`;

        }


        let hpf =
            "70–100 Hz";

        let lpf =
            "2 500–4 000 Hz";


        if (role === "midbass") {

            hpf =
                "70–100 Hz";

            lpf =
                "2 000–3 000 Hz";

        }


        if (role === "midrange") {

            hpf =
                "150–300 Hz";

            lpf =
                "2 500–4 000 Hz";

        }


        middSettings = `

            <div class="setup-line">

                <span>
                    🔊 MIDLÅDA
                </span>

                <strong>
                    ${middbox === "one"
                        ? "1 låda"
                        : "2 lådor"}
                </strong>

            </div>


            <div class="setup-line">

                <span>
                    Antal middar
                </span>

                <strong>
                    ${count} st
                </strong>

            </div>


            <div class="setup-line">

                <span>
                    Storlek
                </span>

                <strong>
                    ${size}"
                </strong>

            </div>


            <div class="setup-line">

                <span>
                    RMS per midd
                </span>

                <strong>
                    ${power > 0
                        ? power + " W"
                        : "Ej angivet"}
                </strong>

            </div>


            <div class="setup-line">

                <span>
                    Total RMS
                </span>

                <strong>
                    ${totalPower > 0
                        ? totalPower + " W"
                        : "Ej angivet"}
                </strong>

            </div>


            <div class="setup-line">

                <span>
                    Impedans per midd
                </span>

                <strong>
                    ${ohm} Ω
                </strong>

            </div>


            <div class="setup-line">

                <span>
                    Roll
                </span>

                <strong>
                    ${roleName}
                </strong>

            </div>


            <div class="setup-line">

                <span>
                    HPF
                </span>

                <strong>
                    ${hpf}
                </strong>

            </div>


            <div class="setup-line">

                <span>
                    LPF
                </span>

                <strong>
                    ${lpf}
                </strong>

            </div>


            <div class="setup-line">

                <span>
                    Filterlutning
                </span>

                <strong>
                    18–24 dB/okt
                </strong>

            </div>


            <div class="setup-line">

                <span>
                    Koppling
                </span>

                <strong>
                    ${connectionText}
                </strong>

            </div>

        `;

    }


    /* =====================================================
       DSP
    ===================================================== */

    let explanation = "";


    if (dsp === "yes") {

        explanation = `

            <div class="info-box">

                <strong>
                    🎛️ DSP-rekommendation
                </strong>

                <p>
                    Börja med EQ på 0 dB.
                    Ställ först delningsfilter,
                    sedan nivåer/gain,
                    därefter fas och tidskompensation.
                    EQ görs sist.
                </p>


                <button
                    class="primary"
                    onclick="openPage('dspwizard')"
                >
                    🎛️ ÖPPNA DSP WIZARD
                </button>

            </div>

        `;
    }


    /* =====================================================
       RESULTAT
    ===================================================== */

    result.classList.remove("hidden");


    result.innerHTML = `

        <h3>
            🛠️ DIN ANLÄGGNING
        </h3>


        <div class="setup-summary">


            <div class="setup-line">

                <span>
                    Stereo
                </span>

                <strong>
                    ${getStereoName(stereo)}
                </strong>

            </div>


            <div class="setup-line">

                <span>
                    DSP
                </span>

                <strong>
                    ${dsp === "yes"
                        ? "Ja"
                        : "Nej"}
                </strong>

            </div>


            <div class="setup-line">

                <span>
                    Frontsystem
                </span>

                <strong>
                    ${getFrontName(front)}
                </strong>

            </div>


            <div class="setup-line">

                <span>
                    Slutsteg
                </span>

                <strong>
                    ${getAmpName(amp)}
                </strong>

            </div>


            ${frontSettings}


            ${middSettings}


            ${subSettings}


        </div>


        ${explanation}


        <div class="info-box">

            <strong>
                📋 Nästa steg
            </strong>

            <p>
                Gå igenom installationschecklistan
                innan du börjar spela högt.
            </p>


            <button
                class="primary"
                onclick="openPage('checklist')"
            >
                📋 ÖPPNA CHECKLISTA
            </button>

        </div>

    `;
}


/* =========================================================
   NAMN FÖR SETUP
========================================================= */

function getStereoName(value) {

    const names = {

        aftermarket:
            "Eftermarknadsstereo",

        original:
            "Originalstereo",

        original_dsp:
            "Originalstereo + DSP"

    };


    return names[value] || value;
}


function getFrontName(value) {

    const names = {

        coax:
            "Koaxialhögtalare",

        mid_tweeter:
            "Middbas + diskant",

        active2:
            "Aktivt 2-vägs"

    };


    return names[value] || value;
}


function getAmpName(value) {

    const names = {

        "2ch":
            "2-kanals",

        "4ch":
            "4-kanals",

        "5ch":
            "5-kanals",

        mono:
            "Monoblock",

        multiple:
            "Flera slutsteg"

    };


    return names[value] || value;
}


/* =========================================================
   CHECKLISTA
========================================================= */

function resetChecklist() {

    const boxes =
        document.querySelectorAll(
            ".check-item input"
        );


    boxes.forEach(box => {

        box.checked = false;

    });
}


/* =========================================================
   START
========================================================= */

openPage("home");
// =========================================================
// PWA / SERVICE WORKER
// =========================================================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("./sw.js")
            .then(() => {

                console.log("Audio Corner: Service Worker aktiv");

            })
            .catch(error => {

                console.error(
                    "Audio Corner: Service Worker kunde inte startas:",
                    error
                );

            });

    });

}

// =========================================================
// VÄLKOMSTPOPUP
// =========================================================

const welcomeModal = document.getElementById("welcomeModal");
const welcomeSetup = document.getElementById("welcomeSetup");
const welcomeLater = document.getElementById("welcomeLater");
const welcomeClose = document.getElementById("welcomeClose");


function closeWelcome() {

    if (!welcomeModal) return;

    welcomeModal.classList.add("hidden");

}


function openWelcome() {

    if (!welcomeModal) return;

    welcomeModal.classList.remove("hidden");

}


// JA, VISA MIG
if (welcomeSetup) {

    welcomeSetup.addEventListener("click", () => {

        closeWelcome();

        openPage("mysetup");

    });

}


// Kanske senare
if (welcomeLater) {

    welcomeLater.addEventListener(
        "click",
        closeWelcome
    );

}


// X-knappen
if (welcomeClose) {

    welcomeClose.addEventListener(
        "click",
        closeWelcome
    );

}


// Klicka utanför popupen för att stänga
if (welcomeModal) {

    welcomeModal.addEventListener("click", (event) => {

        if (event.target === welcomeModal) {

            closeWelcome();

        }

    });

}


// ESC stänger popupen
window.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeWelcome();

    }

});


// Visa popupen när appen öppnas
setTimeout(() => {

    openWelcome();

}, 300);