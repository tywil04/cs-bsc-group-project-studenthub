import { PrismaClient } from "@prisma/client"
import { argon2id, hash } from "argon2"

const prisma = new PrismaClient()

const universities = [
    {
        "name": "University of Aberdeen",
        "domain": "abdn.ac.uk"
    },
    {
        "name": "University of the Built Environment",
        "domain": "ucem.ac.uk"
    },
    {
        "name": "Abertay University",
        "domain": "abertay.ac.uk"
    },
    {
        "name": "Aberystwyth University",
        "domain": "aber.ac.uk"
    },
    {
        "name": "Anglia Ruskin University",
        "domain": "aru.ac.uk"
    },
    {
        "name": "Arden University",
        "domain": "arden.ac.uk"
    },
    {
        "name": "Aston University",
        "domain": "aston.ac.uk"
    },
    {
        "name": "Bangor University",
        "domain": "bangor.ac.uk"
    },
    {
        "name": "University of Bath",
        "domain": "bath.ac.uk"
    },
    {
        "name": "Bath Spa University",
        "domain": "bathspa.ac.uk"
    },
    {
        "name": "University of Bedfordshire",
        "domain": "beds.ac.uk"
    },
    {
        "name": "BIMM University",
        "domain": "bimm.university"
    },
    {
        "name": "University of Birmingham",
        "domain": "birmingham.ac.uk"
    },
    {
        "name": "Birmingham City University",
        "domain": "bcu.ac.uk"
    },
    {
        "name": "Birmingham Newman University",
        "domain": "newman.ac.uk"
    },
    {
        "name": "University College Birmingham",
        "domain": "ucb.ac.uk"
    },
    {
        "name": "Bishop Grosseteste University",
        "domain": "bgu.ac.uk"
    },
    {
        "name": "Arts University Bournemouth",
        "domain": "aub.ac.uk"
    },
    {
        "name": "Bournemouth University",
        "domain": "bournemouth.ac.uk"
    },
    {
        "name": "University of Bradford",
        "domain": "bradford.ac.uk"
    },
    {
        "name": "University of Brighton",
        "domain": "brighton.ac.uk"
    },
    {
        "name": "University of Bristol",
        "domain": "bristol.ac.uk"
    },
    {
        "name": "Brunel University of London",
        "domain": "brunel.ac.uk"
    },
    {
        "name": "University of Buckingham",
        "domain": "buckingham.ac.uk"
    },
    {
        "name": "Buckinghamshire New University",
        "domain": "bucks.ac.uk"
    },
    {
        "name": "University of Cambridge",
        "domain": "cam.ac.uk"
    },
    {
        "name": "Canterbury Christ Church University",
        "domain": "canterbury.ac.uk"
    },
    {
        "name": "Cardiff Metropolitan University",
        "domain": "cardiffmet.ac.uk"
    },
    {
        "name": "Cardiff University",
        "domain": "cardiff.ac.uk"
    },
    {
        "name": "University of Chester",
        "domain": "chester.ac.uk"
    },
    {
        "name": "University of Chichester",
        "domain": "chi.ac.uk"
    },
    {
        "name": "City St George's, University of London",
        "domain": "citystgeorges.ac.uk"
    },
    {
        "name": "Coventry University",
        "domain": "coventry.ac.uk"
    },
    {
        "name": "Cranfield University",
        "domain": "cranfield.ac.uk"
    },
    {
        "name": "University for the Creative Arts",
        "domain": "uca.ac.uk"
    },
    {
        "name": "University of Cumbria",
        "domain": "cumbria.ac.uk"
    },
    {
        "name": "De Montfort University",
        "domain": "dmu.ac.uk"
    },
    {
        "name": "University of Derby",
        "domain": "derby.ac.uk"
    },
    {
        "name": "University of Dundee",
        "domain": "dundee.ac.uk"
    },
    {
        "name": "Durham University",
        "domain": "durham.ac.uk"
    },
    {
        "name": "University of East Anglia",
        "domain": "uea.ac.uk"
    },
    {
        "name": "University of East London",
        "domain": "uel.ac.uk"
    },
    {
        "name": "Edge Hill University",
        "domain": "edgehill.ac.uk"
    },
    {
        "name": "University of Edinburgh",
        "domain": "ed.ac.uk"
    },
    {
        "name": "Edinburgh Napier University",
        "domain": "napier.ac.uk"
    },
    {
        "name": "University of Essex",
        "domain": "essex.ac.uk"
    },
    {
        "name": "University of Exeter",
        "domain": "exeter.ac.uk"
    },
    {
        "name": "Falmouth University",
        "domain": "falmouth.ac.uk"
    },
    {
        "name": "University of Glasgow",
        "domain": "gla.ac.uk"
    },
    {
        "name": "Glasgow Caledonian University",
        "domain": "gcu.ac.uk"
    },
    {
        "name": "University of Gloucestershire",
        "domain": "glos.ac.uk"
    },
    {
        "name": "University of Greater Manchester",
        "domain": "bolton.ac.uk"
    },
    {
        "name": "University of Greenwich",
        "domain": "gre.ac.uk"
    },
    {
        "name": "Harper Adams University",
        "domain": "harper-adams.ac.uk"
    },
    {
        "name": "Hartpury University",
        "domain": "hartpury.ac.uk"
    },
    {
        "name": "Heriot-Watt University",
        "domain": "hw.ac.uk"
    },
    {
        "name": "University of Hertfordshire",
        "domain": "herts.ac.uk"
    },
    {
        "name": "University of the Highlands and Islands",
        "domain": "uhi.ac.uk"
    },
    {
        "name": "University of Huddersfield",
        "domain": "hud.ac.uk"
    },
    {
        "name": "University of Hull",
        "domain": "hull.ac.uk"
    },
    {
        "name": "Imperial College London",
        "domain": "imperial.ac.uk"
    },
    {
        "name": "Keele University",
        "domain": "keele.ac.uk"
    },
    {
        "name": "University of Kent",
        "domain": "kent.ac.uk"
    },
    {
        "name": "Kingston University",
        "domain": "kingston.ac.uk"
    },
    {
        "name": "University of Central Lancashire",
        "domain": "lancashire.ac.uk"
    },
    {
        "name": "Lancaster University",
        "domain": "lancaster.ac.uk"
    },
    {
        "name": "University of Leeds",
        "domain": "leeds.ac.uk"
    },
    {
        "name": "Leeds Arts University",
        "domain": "leeds-art.ac.uk"
    },
    {
        "name": "Leeds Beckett University",
        "domain": "leedsbeckett.ac.uk"
    },
    {
        "name": "Leeds Trinity University",
        "domain": "leedstrinity.ac.uk"
    },
    {
        "name": "University of Leicester",
        "domain": "le.ac.uk"
    },
    {
        "name": "University of Lincoln",
        "domain": "lincoln.ac.uk"
    },
    {
        "name": "University of Liverpool",
        "domain": "liverpool.ac.uk"
    },
    {
        "name": "Liverpool Hope University",
        "domain": "hope.ac.uk"
    },
    {
        "name": "Liverpool John Moores University",
        "domain": "ljmu.ac.uk"
    },
    {
        "name": "University of London",
        "domain": "london.ac.uk"
    },
    {
        "name": "London Metropolitan University",
        "domain": "londonmet.ac.uk"
    },
    {
        "name": "London School of Economics",
        "domain": "lse.ac.uk"
    },
    {
        "name": "London South Bank University",
        "domain": "lsbu.ac.uk"
    },
    {
        "name": "Loughborough University",
        "domain": "lboro.ac.uk"
    },
    {
        "name": "University of Manchester",
        "domain": "manchester.ac.uk"
    },
    {
        "name": "Manchester Metropolitan University",
        "domain": "mmu.ac.uk"
    },
    {
        "name": "Middlesex University",
        "domain": "mdx.ac.uk"
    },
    {
        "name": "Newcastle University",
        "domain": "ncl.ac.uk"
    },
    {
        "name": "University of Northampton",
        "domain": "northampton.ac.uk"
    },
    {
        "name": "Northeastern University \u2013 London",
        "domain": "nulondon.ac.uk"
    },
    {
        "name": "Northumbria University",
        "domain": "northumbria.ac.uk"
    },
    {
        "name": "Norwich University of the Arts",
        "domain": "norwichuni.ac.uk"
    },
    {
        "name": "University of Nottingham",
        "domain": "nottingham.ac.uk"
    },
    {
        "name": "Nottingham Trent University",
        "domain": "ntu.ac.uk"
    },
    {
        "name": "Open University",
        "domain": "open.ac.uk"
    },
    {
        "name": "University of Oxford",
        "domain": "ox.ac.uk"
    },
    {
        "name": "Oxford Brookes University",
        "domain": "brookes.ac.uk"
    },
    {
        "name": "Plymouth Marjon University",
        "domain": "marjon.ac.uk"
    },
    {
        "name": "Arts University Plymouth",
        "domain": "aup.ac.uk"
    },
    {
        "name": "University of Plymouth",
        "domain": "plymouth.ac.uk"
    },
    {
        "name": "University of Portsmouth",
        "domain": "port.ac.uk"
    },
    {
        "name": "Queen Margaret University",
        "domain": "qmu.ac.uk"
    },
    {
        "name": "Queen's University Belfast",
        "domain": "qub.ac.uk"
    },
    {
        "name": "Ravensbourne University London",
        "domain": "ravensbourne.ac.uk"
    },
    {
        "name": "University of Reading",
        "domain": "reading.ac.uk"
    },
    {
        "name": "Regent's University London",
        "domain": "regents.ac.uk"
    },
    {
        "name": "Richmond American University London",
        "domain": "richmond.ac.uk"
    },
    {
        "name": "Robert Gordon University",
        "domain": "rgu.ac.uk"
    },
    {
        "name": "University of Roehampton",
        "domain": "roehampton.ac.uk"
    },
    {
        "name": "Royal Agricultural University",
        "domain": "rau.ac.uk"
    },
    {
        "name": "Royal Holloway, University of London",
        "domain": "royalholloway.ac.uk"
    },
    {
        "name": "University of Salford",
        "domain": "salford.ac.uk"
    },
    {
        "name": "University of Sheffield",
        "domain": "sheffield.ac.uk"
    },
    {
        "name": "Sheffield Hallam University",
        "domain": "shu.ac.uk"
    },
    {
        "name": "University of South Wales",
        "domain": "southwales.ac.uk"
    },
    {
        "name": "University of Southampton",
        "domain": "southampton.ac.uk"
    },
    {
        "name": "Southampton Solent University",
        "domain": "solent.ac.uk"
    },
    {
        "name": "University of St Andrews",
        "domain": "st-andrews.ac.uk"
    },
    {
        "name": "St Mary's University, Twickenham",
        "domain": "stmarys.ac.uk"
    },
    {
        "name": "University of Staffordshire",
        "domain": "staffs.ac.uk"
    },
    {
        "name": "University of Stirling",
        "domain": "stir.ac.uk"
    },
    {
        "name": "University of Strathclyde",
        "domain": "strath.ac.uk"
    },
    {
        "name": "University of Suffolk",
        "domain": "uos.ac.uk"
    },
    {
        "name": "University of Sunderland",
        "domain": "sunderland.ac.uk"
    },
    {
        "name": "University of Surrey",
        "domain": "surrey.ac.uk"
    },
    {
        "name": "University of Sussex",
        "domain": "sussex.ac.uk"
    },
    {
        "name": "Swansea University",
        "domain": "swansea.ac.uk"
    },
    {
        "name": "Teesside University",
        "domain": "tees.ac.uk"
    },
    {
        "name": "University College London",
        "domain": "ucl.ac.uk"
    },
    {
        "name": "University of the Arts London",
        "domain": "arts.ac.uk"
    },
    {
        "name": "Ulster University",
        "domain": "ulster.ac.uk"
    },
    {
        "name": "University of Law",
        "domain": "law.ac.uk"
    },
    {
        "name": "University of Wales",
        "domain": "wales.ac.uk"
    },
    {
        "name": "University of Wales Trinity Saint David",
        "domain": "uwtsd.ac.uk"
    },
    {
        "name": "University of Warwick",
        "domain": "warwick.ac.uk"
    },
    {
        "name": "University of the West of England",
        "domain": "uwe.ac.uk"
    },
    {
        "name": "University of the West of Scotland",
        "domain": "uws.ac.uk"
    },
    {
        "name": "University of West London",
        "domain": "uwl.ac.uk"
    },
    {
        "name": "University of Westminster",
        "domain": "westminster.ac.uk"
    },
    {
        "name": "University of Winchester",
        "domain": "winchester.ac.uk"
    },
    {
        "name": "University of Wolverhampton",
        "domain": "wlv.ac.uk"
    },
    {
        "name": "University of Worcester",
        "domain": "worcester.ac.uk"
    },
    {
        "name": "Wrexham University",
        "domain": "wrexham.ac.uk"
    },
    {
        "name": "University of York",
        "domain": "york.ac.uk"
    },
    {
        "name": "York St John University",
        "domain": "yorksj.ac.uk"
    },
    {
        "name": "Health Sciences University",
        "domain": "hsu.ac.uk"
    }
]

async function createUniversities() {
    try {
        await prisma.university.createMany({ data: universities })
    } catch {}
}

async function createAdminStaff() {
    try {
        const password = await hash("admin", {
            type: argon2id,
            timeCost: 2,
            memoryCost: 2 ** 19, // in kb
            parallelism: 1,
            hashLength: 32, // 32 bytes/256 bit
        });
    
        await prisma.staff.create({
            data: {
                firstName: "Admin",
                lastName: "Admin",
                username: "admin",
                password,
            }
        })
    } catch {}
}

async function main() {
    await createUniversities()

    await createAdminStaff()
}

try {
    main()
} finally {
    await prisma.$disconnect();
}