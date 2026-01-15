import Navbar from './Navbar';

export default function About() {
	return (
		<>
			<Navbar />
			<div className="relative min-h-screen w-full overflow-x-hidden overflow-y-auto bg-gradient-to-b from-slate-50 to-white">
				<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-24 pb-16">
					{/* Page title */}
					<header className="mb-10">
						<h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">เกี่ยวกับโครงการ</h1>
						<p className="mt-2 text-slate-600">การพัฒนาเว็บแมพเพื่อประเมินความเหมาะสมด้านพลังงานแสงอาทิตย์ในมหาวิทยาลัยขอนแก่น 
							<br />Development of a Web Map for Solar Energy Suitability Assessment in Khon Kaen University</p>
					</header>

					{/* 1. Introduction & Overview */}
					<section className="mb-12">
						<h2 className="text-2xl font-bold text-slate-800 mb-3">1) บทนำและภาพรวมโครงการ</h2>
						<p className="text-slate-700 leading-relaxed">
							เว็บไซต์นี้คือ “การพัฒนาเว็บแมพเพื่อประเมินความเหมาะสมด้านพลังงานแสงอาทิตย์ในมหาวิทยาลัยขอนแก่น” โดยมีวัตถุประสงค์หลักเพื่อพัฒนาเว็บแมพสำหรับประเมินความเหมาะสมของพื้นที่หลังคาอาคารในการติดตั้งแผงโซลาร์เซลล์ โดยใช้เทคโนโลยีสารสนเทศภูมิศาสตร์ (GIS) และข้อมูลเชิงพื้นที่
						</p>
						<ul className="mt-4 list-disc pl-6 text-slate-700 space-y-1">
							<li><span className="font-semibold">พื้นที่ศึกษา:</span> มหาวิทยาลัยขอนแก่น และชุมชนกังสดาล</li>
						</ul>
						<div className="mt-4">
							<p className="font-semibold text-slate-800">วัตถุประสงค์</p>
							<ul className="mt-2 list-disc pl-6 text-slate-700 space-y-1">
								<li>ศึกษาปัจจัยที่มีผลต่อความเหมาะสมของพื้นที่หลังคาอาคารสำหรับติดตั้งเซลล์แสงอาทิตย์</li>
								<li>ประเมินและคัดเลือกพื้นที่หลังคาอาคารที่มีศักยภาพสูงสุดสำหรับการติดตั้งระบบเซลล์แสงอาทิตย์</li>
								<li>พัฒนาเว็บแมพสำหรับการติดตั้งแผงโซล่าเซลล์</li>
							</ul>
						</div>
					</section>

					{/* 2. Motivation */}
					<section className="mb-12">
						<h2 className="text-2xl font-bold text-slate-800 mb-3">2) ที่มาและความสำคัญ</h2>
						<p className="text-slate-700 leading-relaxed">
							ประเทศไทยได้รับพลังงานแสงอาทิตย์ค่อนข้างสูงและมีศักยภาพในการผลิตไฟฟ้า แต่ยังขาดการวิเคราะห์ข้อมูลที่แม่นยำในการเลือกพื้นที่ติดตั้งแผงโซลาร์เซลล์ ซึ่งอาจทำให้ประสิทธิภาพการผลิตพลังงานลดลงและเพิ่มต้นทุนการติดตั้ง/บำรุงรักษา เครื่องมือนี้จึงช่วยให้การคัดเลือกพื้นที่ทำได้รวดเร็วและแม่นยำมากขึ้น สนับสนุนพลังงานสะอาดและการพัฒนาที่ยั่งยืนด้านพลังงาน
						</p>
					</section>

					{/* 3. Methodology & Technology */}
					<section className="mb-12">
						<h2 className="text-2xl font-bold text-slate-800 mb-3">3) วิธีการและเทคโนโลยี</h2>
						<h3 className="text-lg font-semibold text-slate-800 mt-4">3.1 ข้อมูลที่ใช้</h3>
						<ul className="mt-2 list-disc pl-6 text-slate-700 space-y-1">
							<li>แบบจำลองพื้นผิวดิจิทัล (DSM): วิเคราะห์ระดับความสูงและมุมตกกระทบของแสงอาทิตย์</li>
							<li>ข้อมูลแสงอาทิตย์จาก Global Solar Atlas</li>
							<li>ขอบเขตอาคาร (Building Footprints) จาก Open Buildings Dataset</li>
							<li>ค่าประสิทธิภาพของแผงโซลาร์เซลล์สำหรับประมาณการพลังงานที่ผลิตได้จริง</li>
						</ul>
						<h3 className="text-lg font-semibold text-slate-800 mt-6">3.2 เกณฑ์การประเมินความเหมาะสม</h3>
						<ul className="mt-2 list-disc pl-6 text-slate-700 space-y-1">
							<li>ความชันของหลังคาไม่เกิน 45 องศา</li>
							<li>ทิศทางของหลังคาอยู่ในช่วงที่เหมาะสม 67.5°–292.5° โดยเน้นทิศตะวันตก ทิศตะวันตกเฉียงใต้ ทิศใต้ ทิศตะวันออกเฉียงใต้ และทิศตะวันออกเป็นหลัก</li>
						</ul>
						<h3 className="text-lg font-semibold text-slate-800 mt-6">3.3 เทคโนโลยีที่ใช้</h3>
						<ul className="mt-2 list-disc pl-6 text-slate-700 space-y-1">
							<li>React.js สำหรับส่วนติดต่อผู้ใช้</li>
							<li>Leaflet.js สำหรับแผนที่แบบอินเทอร์แอกทีฟ</li>
							<li>Tailwind CSS สำหรับงานออกแบบ UI</li>
							<li>QGIS / ArcGIS สำหรับประมวลผลเชิงพื้นที่และ DSM</li>
						</ul>
					</section>

					{/* 4. Key Features */}
					<section className="mb-12">
						<h2 className="text-2xl font-bold text-slate-800 mb-3">4) คุณสมบัติหลักของเว็บแมพ</h2>
						<ul className="mt-2 list-disc pl-6 text-slate-700 space-y-1">
							<li>แผนที่อินเทอร์แอกทีฟ พร้อมการไล่ระดับสีเพื่อสื่อระดับศักยภาพ</li>
							<li>ข้อมูลเชิงปริมาณ: พื้นที่หลังคาที่เหมาะสม (ตร.ม.), พลังงานแสงอาทิตย์ (mWh/year), และพลังงานไฟฟ้าที่คาดว่าจะผลิตได้ (mWh/year)</li>
							<li>การโต้ตอบครบถ้วน: เลื่อน ซูม เปลี่ยนแผนที่พื้นหลัง และ Legend เพื่อทำความเข้าใจข้อมูล</li>
						</ul>
					</section>

					{/* 5. Team */}
					<section className="mb-12">
						<h2 className="text-2xl font-bold text-slate-800 mb-3">5) ทีมผู้พัฒนาและอาจารย์ที่ปรึกษา</h2>
						<div className="overflow-x-auto">
							<table className="min-w-full border border-slate-200 rounded-lg overflow-hidden">
								<thead>
									<tr className="bg-slate-100 text-slate-700">
										<th className="px-4 py-2 text-left">ชื่อ - สกุล</th>
										<th className="px-4 py-2 text-left">รหัสนักศึกษา</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-slate-200">
									<tr>
										<td className="px-4 py-2">นาย ก้องภูมิ ศรีสวัสดิ์</td>
										<td className="px-4 py-2">653380045-0</td>
									</tr>
									<tr>
										<td className="px-4 py-2">นาย อัษฎาวุธ ทิพเสน</td>
										<td className="px-4 py-2">653380243-6</td>
									</tr>
									<tr>
										<td className="px-4 py-2">นาย อิศรานุวัฒน์ สอนศักดา</td>
										<td className="px-4 py-2">653380244-4</td>
									</tr>
								</tbody>
							</table>
						</div>
						<p className="mt-4 text-slate-700"><span className="font-semibold">อาจารย์ที่ปรึกษา:</span> ดร.ศักดิ์พจน์ ทองเลี่ยมนาค</p>
					</section>

					{/* Note */}
					<div className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-amber-800 text-sm text-center">
						หมายเหตุ: เนื้อหานี้สรุปจากเอกสารโครงงานวิจัย เพื่อใช้อธิบายในหน้า About ของเว็บไซต์
					</div>
				</div>
			</div>
		</>
	);
}
