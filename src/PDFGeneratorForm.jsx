import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; 

function PDFGeneratorForm() {
    const [formData, setFormData] = useState({
        name: '',
        courses: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const feeStructure = getFeeStructure(formData.courses);
        generatePDF(formData.name, formData.courses, feeStructure);
    };

    const getFeeStructure = (course) => {
        const feeStructures = {
            "Engineering (B.Tech, B.E.)": [
                { year: "1st Year", oneTimeFee: 80000, tuitionFee: 20000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 21000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 22000 },
                { year: "4rd Year", oneTimeFee: 0, tuitionFee: 22000 }

            ],
            "Medicine (MBBS)": [
                { year: "1st Year", oneTimeFee: 100000, tuitionFee: 30000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 32000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 34000 }
            ],
            "Dentistry (BDS)": [
                { year: "1st Year", oneTimeFee: 80000, tuitionFee: 25000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 26000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 27000 }
            ],
            "Nursing (B.Sc Nursing)": [
                { year: "1st Year", oneTimeFee: 50000, tuitionFee: 18000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 19000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 20000 }
            ],
            "Pharmacy (B.Pharm)": [
                { year: "1st Year", oneTimeFee: 70000, tuitionFee: 23000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 24000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 25000 }
            ],
            "Law (LLB)": [
                { year: "1st Year", oneTimeFee: 60000, tuitionFee: 20000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 21000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 22000 }
            ],
            "Business Administration (BBA)": [
                { year: "1st Year", oneTimeFee: 40000, tuitionFee: 15000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 16000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 17000 }
            ],
            "Hotel Management (BHM)": [
                { year: "1st Year", oneTimeFee: 50000, tuitionFee: 18000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 19000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 20000 }
            ],
            "Computer Applications (BCA)": [
                { year: "1st Year", oneTimeFee: 60000, tuitionFee: 20000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 21000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 22000 }
            ],
            "Commerce (B.Com)": [
                { year: "1st Year", oneTimeFee: 40000, tuitionFee: 15000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 16000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 17000 }
            ],
            "Science (B.Sc)": [
                { year: "1st Year", oneTimeFee: 50000, tuitionFee: 18000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 19000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 20000 }
            ],
            "Arts (BA)": [
                { year: "1st Year", oneTimeFee: 40000, tuitionFee: 15000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 16000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 17000 }
            ],
            "Education (B.Ed)": [
                { year: "1st Year", oneTimeFee: 30000, tuitionFee: 12000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 13000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 14000 }
            ],
            "Architecture (B.Arch)": [
                { year: "1st Year", oneTimeFee: 70000, tuitionFee: 23000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 24000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 25000 }
            ],
            "Physiotherapy (BPT)": [
                { year: "1st Year", oneTimeFee: 60000, tuitionFee: 20000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 21000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 22000 }
            ],
            "Occupational Therapy (BOT)": [
                { year: "1st Year", oneTimeFee: 50000, tuitionFee: 18000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 19000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 20000 }
            ],
            "Biotechnology (B.Tech/B.E., M.Sc)": [
                { year: "1st Year", oneTimeFee: 70000, tuitionFee: 23000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 24000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 25000 }
            ],
            "Computer Science (B.Tech/B.E., M.Sc)": [
                { year: "1st Year", oneTimeFee: 60000, tuitionFee: 20000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 21000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 22000 }
            ],
            "Electronics and Communication Engineering (B.Tech/B.E., M.Tech)": [
                { year: "1st Year", oneTimeFee: 70000, tuitionFee: 23000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 24000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 25000 }
            ],
            "Mechanical Engineering (B.Tech/B.E., M.Tech)": [
                { year: "1st Year", oneTimeFee: 80000, tuitionFee: 26000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 27000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 28000 }
            ],
            "Civil Engineering (B.Tech/B.E., M.Tech)": [
                { year: "1st Year", oneTimeFee: 75000, tuitionFee: 24000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 25000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 26000 }
            ],
            "Electrical Engineering (B.Tech/B.E., M.Tech)": [
                { year: "1st Year", oneTimeFee: 70000, tuitionFee: 23000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 24000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 25000 }
            ],
            "Chemical Engineering (B.Tech/B.E., M.Tech)": [
                { year: "1st Year", oneTimeFee: 85000, tuitionFee: 27000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 28000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 29000 }
            ],
            "Aeronautical Engineering (B.Tech/B.E., M.Tech)": [
                { year: "1st Year", oneTimeFee: 90000, tuitionFee: 28000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 29000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 30000 }
            ],
            "Agricultural Engineering (B.Tech/B.E., M.Tech)": [
                { year: "1st Year", oneTimeFee: 75000, tuitionFee: 24000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 25000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 26000 }
            ],
            "Automobile Engineering (B.Tech/B.E., M.Tech)": [
                { year: "1st Year", oneTimeFee: 80000, tuitionFee: 26000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 27000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 28000 }
            ],
            "Environmental Engineering (B.Tech/B.E., M.Tech)": [
                { year: "1st Year", oneTimeFee: 80000, tuitionFee: 26000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 27000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 28000 }
            ],
            "Marine Engineering (B.Tech/B.E., M.Tech)": [
                { year: "1st Year", oneTimeFee: 85000, tuitionFee: 27000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 28000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 29000 }
            ],
            "Petroleum Engineering (B.Tech/B.E., M.Tech)": [
                { year: "1st Year", oneTimeFee: 90000, tuitionFee: 28000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 29000 },
                { year: "3rd Year", oneTimeFee:0, tuitionFee: 30000 }
            ],
            "Geological Engineering (B.Tech/B.E., M.Tech)": [
                { year: "1st Year", oneTimeFee: 85000, tuitionFee: 27000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 28000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 29000 }
            ],
            "Remote Sensing and GIS (M.Tech)": [
                { year: "1st Year", oneTimeFee: 80000, tuitionFee: 26000 },
                { year: "2nd Year", oneTimeFee:0, tuitionFee: 27000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 28000 }
            ],
            "MBA (Master of Business Administration)": [
                { year: "1st Year", oneTimeFee: 100000, tuitionFee: 35000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 37000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 39000 }
            ],
            "MCA (Master of Computer Applications)": [
                { year: "1st Year", oneTimeFee: 80000, tuitionFee: 30000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 32000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 34000 }
            ],
            "M.Com (Master of Commerce)": [
                { year: "1st Year", oneTimeFee: 60000, tuitionFee: 25000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 27000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 29000 }
            ],
            "MA (Master of Arts)": [
                { year: "1st Year", oneTimeFee: 40000, tuitionFee: 18000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 19000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 20000 }
            ],
            "M.Sc (Master of Science)": [
                { year: "1st Year", oneTimeFee: 50000, tuitionFee: 20000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 22000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 24000 }
            ],
            "M.Tech (Master of Technology)": [
                { year: "1st Year", oneTimeFee: 70000, tuitionFee: 30000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 32000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 34000 }
            ],
            "LLM (Master of Laws)": [
                { year: "1st Year", oneTimeFee: 80000, tuitionFee: 28000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 30000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 32000 }
            ],
            "M.Pharm (Master of Pharmacy)": [
                { year: "1st Year", oneTimeFee: 70000, tuitionFee: 25000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 27000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 29000 }
            ],
            "MDS (Master of Dental Surgery)": [
                { year: "1st Year", oneTimeFee: 90000, tuitionFee: 35000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 37000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 39000 }
            ],
            "MD (Doctor of Medicine)": [
                { year: "1st Year", oneTimeFee: 100000, tuitionFee: 40000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 42000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 44000 }
            ],
            "MS (Master of Surgery)": [
                { year: "1st Year", oneTimeFee: 110000, tuitionFee: 45000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 47000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 49000 }
            ],
            "MPT (Master of Physiotherapy)": [
                { year: "1st Year", oneTimeFee: 80000, tuitionFee: 28000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 30000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 32000 }
            ],
            "MOT (Master of Occupational Therapy)": [
                { year: "1st Year", oneTimeFee: 80000, tuitionFee: 28000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 30000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 32000 }
            ],
            "MPH (Master of Public Health)": [
                { year: "1st Year", oneTimeFee: 70000, tuitionFee: 25000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 25000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 29000 }
            ],
            "M.Ed (Master of Education)": [
                { year: "1st Year", oneTimeFee: 50000, tuitionFee: 20000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 20000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 14000 }
            ],
            "M.Arch (Master of Architecture)": [
                { year: "1st Year", oneTimeFee: 100000, tuitionFee: 35000 },
                { year: "2nd Year", oneTimeFee: 0, tuitionFee: 35000 },
                { year: "3rd Year", oneTimeFee: 0, tuitionFee: 35000 }
            ]
           
        };
        return feeStructures[course];
    };

    const generatePDF = (name, course, feeStructure) => {
        const doc = new jsPDF();
    
        const currentDate = new Date().toLocaleDateString();
        const fileName = `${course}_${currentDate.replaceAll('/', '_')}.pdf`; 
    
        doc.text(`Name: ${name}`, 10, 10);
        doc.text(`Course: ${course}`, 10, 20);
        doc.text(`Date: ${currentDate}`, 10, 30);
        
        doc.autoTable({
            startY: 40,
            styles: {
                cellPadding: 2,
                fontSize: 10,
                halign: 'center',
            },
            headStyles: {
                fillColor: [41, 128, 185],
                textColor: [255], 
                fontStyle: 'bold', 
            },
            bodyStyles: {
                fillColor: [245, 245, 245], 
            },
            head: [['Year', 'One time fee', 'Tuition fee']],
            body: feeStructure.map(({ year, oneTimeFee, tuitionFee }) => [year, `₹${oneTimeFee}`, `₹${tuitionFee}`]),
        });
    
        doc.save(fileName); 
    };
    

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <label htmlFor="name" style={labelStyle}>Name:</label>
            <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                style={inputStyle} 
            />

            <label htmlFor="courses" style={labelStyle}>Select Course:</label>
            <select 
                id="courses" 
                name="courses" 
                value={formData.courses} 
                onChange={handleChange} 
                required
                style={inputStyle}
            >
                  <option value="">Select a course</option>
                <optgroup label="Undergraduate">
                    <option value="Engineering (B.Tech, B.E.)">Engineering (B.Tech, B.E.)</option>
                    <option value="Medicine (MBBS)">Medicine (MBBS)</option>
                    <option value="Dentistry (BDS)">Dentistry (BDS)</option>
                    <option value="Nursing (B.Sc Nursing)">Nursing (B.Sc Nursing)</option>
                    <option value="Pharmacy (B.Pharm)">Pharmacy (B.Pharm)</option>
                    <option value="Law (LLB)">Law (LLB)</option>
                    <option value="Business Administration (BBA)">Business Administration (BBA)</option>
                    <option value="Hotel Management (BHM)">Hotel Management (BHM)</option>
                    <option value="Computer Applications (BCA)">Computer Applications (BCA)</option>
                    <option value="Commerce (B.Com)">Commerce (B.Com)</option>
                    <option value="Science (B.Sc)">Science (B.Sc)</option>
                    <option value="Arts (BA)">Arts (BA)</option>
                    <option value="Education (B.Ed)">Education (B.Ed)</option>
                    <option value="Architecture (B.Arch)">Architecture (B.Arch)</option>
                    <option value="Physiotherapy (BPT)">Physiotherapy (BPT)</option>
                    <option value="Occupational Therapy (BOT)">Occupational Therapy (BOT)</option>
                    <option value="Biotechnology (B.Tech/B.E., M.Sc)">Biotechnology (B.Tech/B.E., M.Sc)</option>
                    <option value="Computer Science (B.Tech/B.E., M.Sc)">Computer Science (B.Tech/B.E., M.Sc)</option>
                    <option value="Electronics and Communication Engineering (B.Tech/B.E., M.Tech)">Electronics and Communication Engineering (B.Tech/B.E., M.Tech)</option>
                    <option value="Mechanical Engineering (B.Tech/B.E., M.Tech)">Mechanical Engineering (B.Tech/B.E., M.Tech)</option>
                    <option value="Civil Engineering (B.Tech/B.E., M.Tech)">Civil Engineering (B.Tech/B.E., M.Tech)</option>
                    <option value="Electrical Engineering (B.Tech/B.E., M.Tech)">Electrical Engineering (B.Tech/B.E., M.Tech)</option>
                    <option value="Chemical Engineering (B.Tech/B.E., M.Tech)">Chemical Engineering (B.Tech/B.E., M.Tech)</option>
                    <option value="Aeronautical Engineering (B.Tech/B.E., M.Tech)">Aeronautical Engineering (B.Tech/B.E., M.Tech)</option>
                    <option value="Agricultural Engineering (B.Tech/B.E., M.Tech)">Agricultural Engineering (B.Tech/B.E., M.Tech)</option>
                    <option value="Automobile Engineering (B.Tech/B.E., M.Tech)">Automobile Engineering (B.Tech/B.E., M.Tech)</option>
                    <option value="Environmental Engineering (B.Tech/B.E., M.Tech)">Environmental Engineering (B.Tech/B.E., M.Tech)</option>
                    <option value="Marine Engineering (B.Tech/B.E., M.Tech)">Marine Engineering (B.Tech/B.E., M.Tech)</option>
                    <option value="Petroleum Engineering (B.Tech/B.E., M.Tech)">Petroleum Engineering (B.Tech/B.E., M.Tech)</option>
                    <option value="Geological Engineering (B.Tech/B.E., M.Tech)">Geological Engineering (B.Tech/B.E., M.Tech)</option>
                    <option value="Remote Sensing and GIS (M.Tech)">Remote Sensing and GIS (M.Tech)</option>
                    <option value="MBA (Master of Business Administration)">MBA (Master of Business Administration)</option>
                    <option value="MCA (Master of Computer Applications)">MCA (Master of Computer Applications)</option>
                    <option value="M.Com (Master of Commerce)">M.Com (Master of Commerce)</option>
                    <option value="MA (Master of Arts)">MA (Master of Arts)</option>
                    <option value="M.Sc (Master of Science)">M.Sc (Master of Science)</option>
                    <option value="M.Tech (Master of Technology)">M.Tech (Master of Technology)</option>
                    <option value="LLM (Master of Laws)">LLM (Master of Laws)</option>
                    <option value="M.Pharm (Master of Pharmacy)">M.Pharm (Master of Pharmacy)</option>
                    <option value="MDS (Master of Dental Surgery)">MDS (Master of Dental Surgery)</option>
                    <option value="MD (Doctor of Medicine)">MD (Doctor of Medicine)</option>
                    <option value="MS (Master of Surgery)">MS (Master of Surgery)</option>
                    <option value="MPT (Master of Physiotherapy)">MPT (Master of Physiotherapy)</option>
                    <option value="MOT (Master of Occupational Therapy)">MOT (Master of Occupational Therapy)</option>
                    <option value="MPH (Master of Public Health)">MPH (Master of Public Health)</option>
                    <option value="M.Ed (Master of Education)">M.Ed (Master of Education)</option>
                    <option value="M.Arch (Master of Architecture)">M.Arch (Master of Architecture)</option>
                </optgroup>
            </select>

            <input type="submit" value="Generate PDF" style={buttonStyle} />
        </form>
    );
}

const formStyle = {
    maxWidth: '400px',
    margin: '0 auto',
    textAlign: 'center',
};

const labelStyle = {
    display: 'block',
    marginBottom: '5px',
};

const inputStyle = {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
};

const buttonStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: 'white',
    cursor: 'pointer',
};

export default PDFGeneratorForm;
