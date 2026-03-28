import { useState, useMemo } from 'react'
import { Calculator as CalcIcon, DollarSign, Percent, Clock, TrendingDown, PieChart, ArrowRight } from 'lucide-react'
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import './Calculator.css'

ChartJS.register(ArcElement, ChartTooltip, Legend)

export default function Calculator() {
  const [loanAmount, setLoanAmount] = useState(500000)
  const [interestRate, setInterestRate] = useState(6.5)
  const [loanTerm, setLoanTerm] = useState(30)
  const [downPayment, setDownPayment] = useState(20)

  const calc = useMemo(() => {
    const principal = loanAmount * (1 - downPayment / 100)
    const monthlyRate = interestRate / 100 / 12
    const numPayments = loanTerm * 12
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    const totalPayment = monthlyPayment * numPayments
    const totalInterest = totalPayment - principal

    return { principal, monthlyPayment, totalPayment, totalInterest, downPaymentAmount: loanAmount * downPayment / 100 }
  }, [loanAmount, interestRate, loanTerm, downPayment])

  const chartData = {
    labels: ['Principal', 'Interest', 'Down Payment'],
    datasets: [{
      data: [calc.principal, calc.totalInterest, calc.downPaymentAmount],
      backgroundColor: ['#d4a853', '#3b82f6', '#22c55e'],
      borderWidth: 0,
      hoverOffset: 8,
    }]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#a0a0b0', padding: 20, font: { family: 'Inter', size: 12 } }
      }
    },
    cutout: '70%',
  }

  return (
    <div className="page-enter calc-page">
      <section className="calc-hero">
        <div className="container">
          <div className="section-label"><CalcIcon size={12} /> Financial Planning</div>
          <h1>EMI <span className="gradient-text">Calculator</span></h1>
          <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            Plan your mortgage payments and understand the true cost of your dream property.
          </p>
        </div>
      </section>

      <section className="container calc-content">
        <div className="calc-grid">
          <div className="calc-inputs glass-card">
            <h3>Loan Parameters</h3>

            <div className="calc-slider-group">
              <div className="slider-header">
                <label><DollarSign size={14} /> Property Value</label>
                <span className="slider-value">${loanAmount.toLocaleString()}</span>
              </div>
              <input type="range" min="100000" max="10000000" step="50000" value={loanAmount}
                onChange={e => setLoanAmount(parseInt(e.target.value))} className="calc-slider" />
              <div className="slider-range"><span>$100K</span><span>$10M</span></div>
            </div>

            <div className="calc-slider-group">
              <div className="slider-header">
                <label><Percent size={14} /> Down Payment</label>
                <span className="slider-value">{downPayment}% (${(loanAmount * downPayment / 100).toLocaleString()})</span>
              </div>
              <input type="range" min="5" max="50" step="5" value={downPayment}
                onChange={e => setDownPayment(parseInt(e.target.value))} className="calc-slider" />
              <div className="slider-range"><span>5%</span><span>50%</span></div>
            </div>

            <div className="calc-slider-group">
              <div className="slider-header">
                <label><TrendingDown size={14} /> Interest Rate</label>
                <span className="slider-value">{interestRate}% APR</span>
              </div>
              <input type="range" min="2" max="12" step="0.25" value={interestRate}
                onChange={e => setInterestRate(parseFloat(e.target.value))} className="calc-slider" />
              <div className="slider-range"><span>2%</span><span>12%</span></div>
            </div>

            <div className="calc-slider-group">
              <div className="slider-header">
                <label><Clock size={14} /> Loan Term</label>
                <span className="slider-value">{loanTerm} years</span>
              </div>
              <input type="range" min="5" max="30" step="5" value={loanTerm}
                onChange={e => setLoanTerm(parseInt(e.target.value))} className="calc-slider" />
              <div className="slider-range"><span>5 yrs</span><span>30 yrs</span></div>
            </div>
          </div>

          <div className="calc-results">
            <div className="emi-display glass-card">
              <span className="emi-label">Monthly EMI</span>
              <span className="emi-amount">${Math.round(calc.monthlyPayment).toLocaleString()}</span>
              <span className="emi-sublabel">per month for {loanTerm} years</span>
            </div>

            <div className="calc-chart glass-card">
              <h4>Payment Breakdown</h4>
              <div className="chart-wrap">
                <Doughnut data={chartData} options={chartOptions} />
              </div>
            </div>

            <div className="calc-summary glass-card">
              <div className="summary-row">
                <span>Loan Amount</span>
                <strong>${Math.round(calc.principal).toLocaleString()}</strong>
              </div>
              <div className="summary-row">
                <span>Down Payment</span>
                <strong style={{ color: 'var(--success)' }}>${Math.round(calc.downPaymentAmount).toLocaleString()}</strong>
              </div>
              <div className="summary-row">
                <span>Total Interest</span>
                <strong style={{ color: 'var(--info)' }}>${Math.round(calc.totalInterest).toLocaleString()}</strong>
              </div>
              <div className="summary-row total">
                <span>Total Payment</span>
                <strong>${Math.round(calc.totalPayment).toLocaleString()}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
