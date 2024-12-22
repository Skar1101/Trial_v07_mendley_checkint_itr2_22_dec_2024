import Link from 'next/link'

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
}

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white mb-6">Your Personal AI Companion</h1>
      <p className="text-xl text-white mb-8">
        Experience the next generation of AI interaction with personalized
        conversations, journaling, and memory management.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <FeatureCard
          title="AI Buddy"
          description="Have natural conversations with your AI companion who understands and adapts to your personality."
          icon="💬"
          href="/preferences"
        />
        <FeatureCard
          title="Smart Journal"
          description="Document your thoughts and experiences with AI-powered insights and emotional analysis."
          icon="📝"
          href="/journal"
        />
        <FeatureCard
          title="Memory Bank"
          description="Access your conversation history and journal entries with intelligent search and organization."
          icon="🧠"
          href="/memory"
        />
      </div>
      <div className="space-x-4">
        <Link href="/preferences" className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-purple-100 transition-colors">
          Start Chatting
        </Link>
        <Link href="/journal" className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700 transition-colors">
          Open Journal
        </Link>
      </div>
    </div>
  )
}

function FeatureCard({ title, description, icon, href }: FeatureCardProps) {
  return (
    <Link href={href} className="block">
      <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-lg hover:bg-opacity-20 transition-all">
        <div className="text-4xl mb-4">{icon}</div>
        <h2 className="text-2xl font-semibold text-white mb-2">{title}</h2>
        <p className="text-white text-opacity-80">{description}</p>
      </div>
    </Link>
  )
}

