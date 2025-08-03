import { FeatureCard } from "@/components/shared/feature-card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { ProgressBar } from "@/components/shared/progress-bar"

// Dummy Data
const leaderboardData = [
  { rank: 1, name: "মাইশা রহমান", score: "০৯/১০", avatar: "/placeholder.svg?width=40&height=40" },
  { rank: 2, name: "মাইশা রহমান", score: "০৯/১০", avatar: "/placeholder.svg?width=40&height=40" },
  { rank: 3, name: "আয়াত ইসলাম", score: "১০/১০", avatar: "/placeholder.svg?width=40&height=40" },
  { rank: 4, name: "জেনিফা সুলতানা", score: "০৬/২২", avatar: "/placeholder.svg?width=40&height=40" },
  { rank: 5, name: "জান্নাত আরাফাত", score: "০৩/২২", avatar: "/placeholder.svg?width=40&height=40" },
  { rank: 6, name: "নাফিস হাসান", score: "০১/১০", avatar: "/placeholder.svg?width=40&height=40" },
  { rank: 7, name: "জেনিফা সুলতানা", score: "০৩/১০", avatar: "/placeholder.svg?width=40&height=40" },
]

const reportData = [
  { subject: "পদার্থ বিজ্ঞানের ইতিহাস", progress: 20, color: "bg-red-500" },
  { subject: "ভেক্টর ও স্কেলার রাশি", progress: 20, color: "bg-orange-500" },
  { subject: "ভেক্টরের ধর্ম", progress: 20, color: "bg-purple-500" },
  { subject: "ভেক্টরের যোগ", progress: 20, color: "bg-blue-500" },
  { subject: "গতি ও স্থিতি", progress: 20, color: "bg-teal-500" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div
        className="p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between text-center sm:text-left"
        style={{ background: "linear-gradient(100deg, #E3F2FD 0%, #F3E5F5 100%)" }}
      >
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">তোমার ভর্তির স্বপ্ন, পূরণ হবে সত্যি</h2>
          <p className="mt-2 text-gray-600 max-w-md mx-auto sm:mx-0">
            তোমার প্রস্তুতি হোক সেরা। সহজে প্রস্তুতি নাও এবং এগিয়ে থাকো সবার থেকে।
          </p>
          <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
            অ্যাপ ডাউনলোড <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
        <div className="hidden md:block">
          <Image
            src="/placeholder.svg?width=150&height=150"
            alt="Student Avatar"
            width={150}
            height={150}
            className="mt-4 sm:mt-0"
          />
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          icon={
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CONTACT%20%281%29-d4bU9O9X6UWrS4po76NlvPJqMbNqnD.png"
              alt="Prepare Icon"
              width={64}
              height={64}
            />
          }
          title="প্রস্তুতি নাও"
          description="পছন্দের বিষয়, অধ্যায়, বা টপিক বেছে নিয়ে সহজে প্রস্তুতি নাও"
        />
        <FeatureCard
          icon={<Image src="/placeholder.svg?width=64&height=64" alt="Exam Icon" width={64} height={64} />}
          title="পরীক্ষা দাও"
          description="নিজের দক্ষতা যাচাই করতে পরীক্ষা দাও এবং প্রস্তুতিকে আরও মজবুত করো"
        />
        <FeatureCard
          icon={<Image src="/placeholder.svg?width=64&height=64" alt="Question Bank Icon" width={64} height={64} />}
          title="প্রশ্নব্যাংক"
          description="বিগত বছরের প্রশ্ন ও সমাধান পেয়ে যাও এক জায়গায়"
        />
        <FeatureCard
          icon={<Image src="/placeholder.svg?width=64&height=64" alt="AI Doubt Solve Icon" width={64} height={64} />}
          title="AI ডাউট সলভ"
          description="যেকোনো সমস্যায় আটকে গেলে সাহায্য নাও আমাদের AI থেকে"
        />
        <FeatureCard
          icon={<Image src="/placeholder.svg?width=64&height=64" alt="Routine Icon" width={64} height={64} />}
          title="রুটিন"
          description="তোমার পড়ার রুটিন তৈরি করো এবং পড়াশোনাকে গুছিয়ে নাও"
        />
        <FeatureCard
          icon={<Image src="/placeholder.svg?width=64&height=64" alt="E-Library Icon" width={64} height={64} />}
          title="ই-লাইব্রেরি"
          description="প্রয়োজনীয় সকল বই ও নোটস পেয়ে যাও আমাদের ডিজিটাল লাইব্রেরিতে"
        />
      </div>

      {/* Reports and Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leaderboard */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="font-bold text-lg text-gray-800 mb-4">লিডারবোর্ড</h3>
          <ul className="space-y-3">
            {leaderboardData.map((user) => (
              <li key={user.rank} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-gray-500 w-4">{user.rank}</span>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-gray-700">{user.name}</span>
                </div>
                <span className="font-semibold text-purple-700">{user.score}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Program Report */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="font-bold text-lg text-gray-800 mb-4">প্রোগ্রাম রিপোর্ট</h3>
          <ul className="space-y-4">
            {reportData.map((item) => (
              <li key={item.subject}>
                <div className="flex justify-between items-center mb-1 text-sm">
                  <span className="font-medium text-gray-700">{item.subject}</span>
                  <span className="font-semibold text-gray-600">{item.progress}%</span>
                </div>
                <ProgressBar value={item.progress} colorClass={item.color} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
