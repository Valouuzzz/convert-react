import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
    const [amount, setAmount] = useState('');
    const [currencyFrom, setCurrencyFrom] = useState('USD');
    const [currencyTo, setCurrencyTo] = useState('EUR');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const [showGif, setShowGif] = useState(false);
    const convertCurrency = () => {
        if (amount.trim() === '') {
            setError('Veuillez entrer un montant à convertir.');
            setResult('');
            setShowGif(false);
        } else if (isNaN(amount)) {
            setError('Veuillez entrer un montant numérique valide.');
            setResult('');
            setShowGif(false);
        } else if (parseFloat(amount) === 0) {
            setShowGif(true);
        } else {
            const exchangeRates = {
                USD: { EUR: 0.85, GBP: 1.26 },
                EUR: { USD: 1.18, GBP: 0.85 },
                GBP: { USD: 0.79, EUR: 1.18 }
            };

            const convertedAmount = (parseFloat(amount) * exchangeRates[currencyFrom][currencyTo]).toFixed(2);
            setResult(`${amount} ${currencyFrom} = ${convertedAmount} ${currencyTo}`);
            setError('');
            setShowGif(false);
        }
    };

    const handleButtonClick = () => {
        convertCurrency();
    };

    return (
        <div id="converter" className="container mt-5">
            <div className="card p-4 shadow-sm">
                <h2 className="text-center mb-4">Convertisseur de Devises</h2>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Entrer le montant à convertir" value={amount} onChange={(e) => setAmount(e.target.value)}/>
                </div>
                <div className="form-group">
                    <select className="form-control" value={currencyFrom} onChange={(e) => setCurrencyFrom(e.target.value)}>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                    </select>
                </div>
                <div className="form-group">
                    <select className="form-control" value={currencyTo} onChange={(e) => setCurrencyTo(e.target.value)}>
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                        <option value="GBP">GBP</option>
                    </select>
                </div>
                <button className="btn btn-primary btn-block" onClick={handleButtonClick}>
                    Convertir
                </button>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
                {result && <div className="alert alert-success mt-3">{result}</div>}
                {showGif && (
                    <iframe
                        src="https://giphy.com/embed/8BMaLLBlUdNx6"
                        width="480"
                        height="422"
                        style={{ border: 'none' }}
                        title="Zero Amount GIF"
                        className="giphy-embed"
                        allowFullScreen
                    ></iframe>
                )}
            </div>
        </div>
    );
};

export default App;
