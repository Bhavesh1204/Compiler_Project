import { useState } from "react";
import axios from "axios";
import './App.css'

function App() {
  const [code, setCode] = useState("");
  const [tokens, setTokens] = useState([]);

  const analyzeCode = async () => {
    if (!code.trim()) return; // Prevents sending empty code
    try {
      const response = await axios.post("http://localhost:5000/analyze", { code });
      setTokens(response.data);
    } catch (error) {
      console.error("Error analyzing code:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Code Converter to Lexemes And Tokens</h1>
      
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your code here..."
        className="w-full max-w-2xl h-40 p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={analyzeCode}
        className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md"
      >
        Analyze Code
      </button>

      {tokens.length > 0 && (
        <div className="mt-6 w-full max-w-2xl">
          <h2 className="text-2xl font-semibold mb-3">Analysis Result</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-700">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="border border-gray-700 p-2">Lexeme</th>
                  <th className="border border-gray-700 p-2">Token</th>
                </tr>
              </thead>
              <tbody>
                {tokens.map((token, index) => (
                  <tr key={index} className="odd:bg-gray-700 even:bg-gray-800">
                    <td className="border border-gray-700 p-2">{token.lexeme}</td>
                    <td className="border border-gray-700 p-2">{token.token}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;


//  If You want changes then you can Uncomment the code 
// import { useState } from "react";
// import axios from "axios";
// import './App.css';

// function App() {
//   const [code, setCode] = useState("");
//   const [tokens, setTokens] = useState([]);
//   const [tokenSummary, setTokenSummary] = useState({});

//   const analyzeCode = async () => {
//     if (!code.trim()) return;
//     try {
//       const response = await axios.post("http://localhost:5000/analyze", { code });
//       setTokens(response.data.tokens);
//       setTokenSummary(response.data.summary);
//     } catch (error) {
//       console.error("Error analyzing code:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
//       <h1 className="text-3xl font-bold mb-4">Code Converter to Lexemes And Tokens</h1>
      
//       <textarea
//         value={code}
//         onChange={(e) => setCode(e.target.value)}
//         placeholder="Enter your code here..."
//         className="w-full max-w-2xl h-40 p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />

//       <button
//         onClick={analyzeCode}
//         className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md"
//       >
//         Analyze Code
//       </button>

//       {tokens.length > 0 && (
//         <div className="mt-6 w-full max-w-2xl">
//           <h2 className="text-2xl font-semibold mb-3">Analysis Result</h2>
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse border border-gray-700">
//               <thead>
//                 <tr className="bg-gray-800 text-white">
//                   <th className="border border-gray-700 p-2">Lexeme</th>
//                   <th className="border border-gray-700 p-2">Token</th>
//                   <th className="border border-gray-700 p-2">Line</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tokens.map((token, index) => (
//                   <tr key={index} className="odd:bg-gray-700 even:bg-gray-800">
//                     <td className="border border-gray-700 p-2">{token.lexeme}</td>
//                     <td className="border border-gray-700 p-2">{token.token}</td>
//                     <td className="border border-gray-700 p-2">{token.line}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <h2 className="text-2xl font-semibold mt-6 mb-3">Token Frequency</h2>
//           <ul className="bg-gray-800 p-4 rounded-lg">
//             {Object.entries(tokenSummary).map(([tokenType, count], index) => (
//               <li key={index} className="text-lg">{tokenType}: {count}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
