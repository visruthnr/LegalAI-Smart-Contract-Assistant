import { LegalDocument, UserRole, ChatMessage } from '../types';

// Mock AI service that simulates Google Gemini Pro responses
export const generateResponse = async (
  message: string, 
  document: LegalDocument | null, 
  userRole: UserRole
): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

  const lowerMessage = message.toLowerCase();

  // Context-aware responses based on message content
  if (lowerMessage.includes('risk') || lowerMessage.includes('risky')) {
    return `Based on my analysis of ${document?.title || 'the document'}, I've identified several risk areas relevant to your role as a ${userRole}:

🚨 **High Risk Clauses:**
- Late payment fees (5% daily compound interest)
- Unlimited tenant liability for repairs
- Vague security deposit return terms

⚠️ **Medium Risk Areas:**
- 60-day termination notice requirement
- Landlord's right to enter with 24-hour notice

**Recommendation:** I suggest negotiating the late fee structure and clarifying maintenance responsibilities. Would you like me to help you draft alternative language for any of these clauses?`;
  }

  if (lowerMessage.includes('late') || lowerMessage.includes('fee')) {
    return `The late fee clause in your lease is particularly concerning. Here's what it means:

**Original clause:** "Late payment shall incur a fee of 5% of the monthly rent for each day the payment remains outstanding after the fifth day of the month."

**Translation:** If your rent is $2,500/month and you're 10 days late, you'd owe:
- Day 6: $125 fee
- Day 7: $125 fee  
- Day 8: $125 fee
- And so on...

This could add up to $1,250 in just 10 days! 

**Better alternative:** "Late fees are $50 after a 5-day grace period, capped at $200 total per month."

Would you like me to generate more tenant-friendly alternatives?`;
  }

  if (lowerMessage.includes('termination') || lowerMessage.includes('end') || lowerMessage.includes('break')) {
    return `Regarding lease termination, here's what your document says:

**Early Termination:** You can terminate early with 60 days written notice, but you'll pay a penalty equal to 2 months' rent ($5,000).

**Normal Termination:** Either party can end the lease with 60 days notice at the end of the lease term.

**Your Rights as a ${userRole}:**
- You can negotiate the penalty amount
- Some states limit early termination fees
- Job relocation might qualify you for reduced penalties

**Scenarios where this matters:**
- Job change requiring relocation
- Family emergencies
- Property becoming uninhabitable

Would you like me to simulate a conversation about early termination with your landlord?`;
  }

  if (lowerMessage.includes('maintenance') || lowerMessage.includes('repair')) {
    return `The maintenance clause in your lease heavily favors the landlord. Here's the breakdown:

**What the lease says:** "Tenant agrees to maintain the premises in good condition and shall be responsible for all repairs and maintenance, ordinary and extraordinary."

**What this means for you:**
- You pay for ALL repairs, even major ones like HVAC, plumbing, electrical
- Normal wear and tear becomes your responsibility
- Structural issues could be your financial burden

**Standard practice:** Landlords typically handle:
- Major appliance repairs
- Structural maintenance  
- HVAC system maintenance
- Plumbing beyond minor clogs

**Red flag:** "Extraordinary" repairs could include roof, foundation, or electrical system issues costing thousands.

**Recommended rewrite:** "Tenant responsible for minor maintenance under $100. Landlord handles major repairs, appliances, and structural issues."

This could save you thousands in unexpected repair costs!`;
  }

  if (lowerMessage.includes('security') || lowerMessage.includes('deposit')) {
    return `Your security deposit terms need attention:

**Current terms:** $5,000 deposit with vague language about "faithful performance" and "damages."

**Problems with this:**
- No timeline specified for return
- Unclear what constitutes "damages"
- No process for dispute resolution

**What could happen:**
- Deposit held for months after move-out
- Deductions for normal wear and tear
- No itemized list of damages

**Better language:** 
"Security deposit of $5,000 refundable within 21 days of move-out. Deductions only for damages beyond normal wear and tear, with itemized receipt provided."

**Your state laws:** Most states require deposit return within 14-30 days with itemized deductions.

Would you like me to check what's typical for security deposits in your area?`;
  }

  if (lowerMessage.includes('negotiate') || lowerMessage.includes('change')) {
    return `Here are negotiation strategies based on your role as a ${userRole}:

**High-Priority Items to Negotiate:**
1. **Late fees:** Reduce from 5% daily to flat $50 after grace period
2. **Maintenance:** Limit tenant responsibility to items under $100
3. **Security deposit:** Add timeline for return (21 days)
4. **Termination penalty:** Reduce from 2 months to 1 month rent

**Your Negotiating Position:**
- Good credit score and stable income
- Long-term tenant potential
- Market conditions (if favorable to tenants)

**Scripts for negotiation:**
- "I'm very interested in this property, but the late fee structure seems unusually high compared to other leases I've seen..."
- "Could we add language about the security deposit return timeline to protect both of us?"

**Alternative approach:** Propose a lease amendment with your preferred terms.

Would you like me to help draft specific negotiation points or alternative clause language?`;
  }

  // Default contextual response
  if (document) {
    return `I understand you're asking about "${message}" in relation to your ${document.type} agreement.

As your Legal Twin assistant, I've analyzed ${document.title} specifically for ${userRole} concerns. Here are the key points:

**Document Summary:**
- Type: ${document.type.charAt(0).toUpperCase() + document.type.slice(1)} Agreement
- Overall risk level: ${document.riskLevel.toUpperCase()}
- Primary concerns for ${userRole}s identified

**What I can help with:**
- Explain any clause in plain English
- Identify potential risks and red flags  
- Suggest alternative phrasings
- Simulate "what-if" scenarios
- Generate negotiation strategies

Try asking me something specific like:
- "What are the riskiest parts of this contract?"
- "Can the landlord increase rent?"
- "What happens if I need to move out early?"
- "Are there any hidden fees?"

What specific aspect would you like me to focus on?`;
  }

  return `Hello! I'm your Legal Twin assistant, here to help demystify legal documents.

I can help you:
📋 **Understand complex clauses** in plain English
⚠️ **Identify risks** specific to your situation  
✏️ **Rewrite clauses** in fairer language
🎭 **Simulate scenarios** to see potential outcomes
💡 **Suggest negotiation** strategies

To get started, upload a legal document or try one of our demo documents. Then ask me questions like:
- "What should I be worried about in this contract?"
- "Can you explain the payment terms?"
- "What happens if I need to terminate early?"

As a ${userRole}, I'll focus on the clauses and risks most relevant to your situation.

How can I help you today?`;
};