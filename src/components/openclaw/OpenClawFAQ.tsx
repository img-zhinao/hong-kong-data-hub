import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    q: '什么是"养好的龙虾"？',
    a: 'OpenClaw 军团就像已经养好的龙虾——我们提前完成了硬件部署、AI员工训练、业务流程配置和实际运营验证。您购买后无需从零搭建，直接接手一个已经在稳定产生收益的数字资产。',
  },
  {
    q: '购买后如何接管？',
    a: '完成支付后，我们会在3个工作日内完成过户：1）硬件设备通过安全物流寄送到您指定地址；2）所有账户、密钥、配置远程移交；3）提供1对1的接管培训和30天免费技术支持。整个过程无缝衔接，确保军团持续运营不中断。',
  },
  {
    q: '收益如何结算？',
    a: '军团产生的收益实时记录在运营面板中，您可以随时查看。收益通常以数字资产或法币形式结算，具体取决于军团的业务类型。大部分军团支持按日查看收益明细，按周或按月提取。',
  },
];

export function OpenClawFAQ() {
  return (
    <section className="py-16">
      <div className="container max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3">常见问题</h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-xl bg-white/5 border border-white/10 px-5 data-[state=open]:border-gold/30"
            >
              <AccordionTrigger className="text-white hover:text-gold hover:no-underline text-left py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-slate-400 leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
